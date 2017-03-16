import isUrl from 'is-url';

import Ressource from './Ressource';
import Account from './Account';
import Project from './Project';
import { getConfig } from '../config';

const { api_url } = getConfig();
const paramDefaults = {};
const creatableField = [
  'project_region',
  'plan',
  'project_title',
  'storage',
  'environments',
  'activation_callback'
];
const url = `${api_url}/subscriptions/:id`;
const STATUS_ACTIVE = 'active';
const STATUS_REQUESTED = 'requested';
const STATUS_PROVISIONING = 'provisioning';

const availablePlans = ['development', 'standard', 'medium', 'large'];
const availableRegions = ['eu.platform.sh', 'us.platform.sh'];

export default class Subscription extends Ressource {
  constructor(subscription) {
    const { id } = subscription;

    super(url, paramDefaults, { id }, subscription, creatableField);
    this._queryUrl = Ressource.getQueryUrl(url);
    this._required = ['project_region'];
    this.id = '';
    this.status = '';
    this.owner = '';
    this.plan = '';
    this.environments = 0;
    this.storage = 0;
    this.user_licenses = 0;
    this.project_id = '';
    this.project_title = '';
    this.project_title = '';
    this.project_region = '';
    this.project_region_label = '';
    this.project_ui = '';
    this.STATUS_FAILED = 'provisioning Failure';
    this.STATUS_SUSPENDED = 'suspended';
    this.STATUS_DELETED = 'deleted';
  }

  static get(params, customUrl = url) {
    const {id, ...queryParams} = params;

    return super.get(customUrl, { id }, paramDefaults, queryParams);
  }

  static getAvailablePlans() {
    return availablePlans;
  }

  static getAvailableRegions() {
    return availableRegions;
  }

  /**
   * Wait for the subscription's project to be provisioned.
   *
   * @param callable  onPoll   A function that will be called every time the
   *                            subscription is refreshed. It will be passed
   *                            one argument: the Subscription object.
   * @param int       interval The polling interval, in seconds.
   */
  wait(onPoll, interval = 2) {
    const millisecInterval = interval * 1000;

    return new Promise(resolve => {
      const interval = setInterval(() => {
        if(!this.isPending()) {
          resolve(this);
          return clearInterval(interval);
        }
        this.refresh().then(() => {
          if(onPoll) {
            onPoll(this);
          }
        });
      }, millisecInterval);
    });
  }

  /**
  * @inheritdoc
  */
  checkProperty(property, value) {
    const errors = {};

    if (property === 'storage' && value < 1024) {
      errors[property] = 'Storage must be at least 1024 MiB';
    } else if (property === 'activation_callback') {
      if(!value.uri) {
        errors[property] = "A 'uri' key is required in the activation callback";
      } else if (!isUrl(value.uri)) {
        errors[property] = 'Invalid URI in activation callback';
      }
    }

    return errors;
  }

  /**
  * Check whether the subscription is pending (requested or provisioning).
  *
  * @return bool
  */
  isPending() {
    const status = this.getStatus();

    return status === STATUS_PROVISIONING || status === STATUS_REQUESTED;
  }
  /**
  * Find whether the subscription is active.
  *
  * @return bool
  */
  isActive() {
    return this.getStatus() === STATUS_ACTIVE;
  }
  /**
   * Get the subscription status.
   *
   * This could be one of Subscription::STATUS_ACTIVE,
   * Subscription::STATUS_REQUESTED, Subscription::STATUS_PROVISIONING,
   * Subscription::STATUS_SUSPENDED, or Subscription::STATUS_DELETED.
   *
   * @return string
   */
  getStatus() {
    return this.status;
  }
  /**
   * Get the account for the project's owner.
   *
   * @return Account|false
   */
  getOwner() {
    const id = this.owner;
    const url = this.makeAbsoluteUrl('/api/users', this.getLink('project'));

    return Account.get({ id }, url);
  }

  /**
   * Get the project associated with this subscription.
   *
   * @return Project|false
   */
  getProject() {
    if (!this.hasLink('project') && !this.isActive()) {
      throw new Error('Inactive subscriptions do not have projects.');
    }
    const url = this.getLink('project');

    return Project.get({}, url);
  }

  /**
   * @inheritdoc
   */
  wrap(data) {
    return Ressource.wrap(data.subscriptions ? data.subscriptions : {});
  }

  /**
  * @inheritdoc
  */
  operationAvailable(op) {
    if (op === 'edit') {
      return true;
    }
    return super.operationAvailable(op);
  }
  /**
  * @inheritdoc
  */
  getLink(rel, absolute = false) {
    if(rel === '#edit') {
      return this.getUri(absolute);
    }
    return super.getLink(rel, absolute);
  }

  /**
   * @inheritdoc
   */
  copy(data = {}) {
    this.data = (data.subscriptions && data.subscriptions[0]) || data;
  }
}
