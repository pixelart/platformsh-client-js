import Ressource from './Ressource';
import { getConfig } from '../config';

import TeamMember from './TeamMember';

const paramDefaults = {};
const _url = '/platform/teams';

const creatableField = ['name', 'parent', 'id'];
const modifiableField = ['name'];

export default class Team extends Ressource {
  constructor(team, url) {
    super(url, paramDefaults, {}, team, creatableField, modifiableField);
    this.id = '';
    this.name = '';
    this.parent = '';
  }

  static get(params = {}, customUrl) {
    const { id, ...queryParams } = params;
    const { api_url } = getConfig();

    return super.get(customUrl || `${api_url}${_url}/:id`, { id }, paramDefaults, queryParams);
  }

  static query(params, customUrl) {
    const { api_url } = getConfig();

    return super.query(customUrl || `${api_url}${_url}`, {}, paramDefaults, params);
  }

  getMembers() {
    return TeamMember.query({ teamId: this.id});
  }
}
