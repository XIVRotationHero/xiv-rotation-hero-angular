const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const http = rateLimit(axios.create(), { maxRequests: 4, perMilliseconds: 1000, maxRPS: 4 });
const fs = require('fs');

class XIVApi {
  static jobs() {
    const columns = [
      'ID',
      'Abbreviation',
      'BattleClassIndex',
      'ClassJobParentTargetID',
      'GameContentLinks.Action',
      'GameContentLinks.ActionIndirection',
      'GameContentLinks.Trait',
      'Url',
      'Icon',
      'Name_en',
      'Name_ja',
      'Name_fr',
      'Name_de'
    ];
    return this.getAPI(`/ClassJob?columns=${columns.join()}`).then((response) => response.Results);
  }
  static actionsForJob(job, actionIndirections) {
    let actionIds = [ ...job.GameContentLinks.Action.ClassJob ];

    if (job.GameContentLinks.ActionIndirection) {
      console.log(job.GameContentLinks.ActionIndirection.ClassJob);
      console.log(actionIndirections);
      actionIds = [
        ...actionIds,
        ...job.GameContentLinks.ActionIndirection.ClassJob.map((id) => {
          return actionIndirections[ id ].Name.ID;
        })
      ]
    }

    const filters = [
        `ID|=${actionIds.join(';')}`,
        `IsPvP=0`
    ].join(',');
    const columns = [
      'ID',
      'BehaviourType',
      'ActionCategory',
      'CastType',
      'EffectRange',
      'Range',
      'TargetArea',
      'Name',
      'Description',
      'DescriptionJSON',
      'ClassJobLevel',
      'CooldownGroup',
      'ActionComboTargetID',
      'IconHD',
      'Cast100ms',
      'Recast100ms',
      'PreservesCombo',
      'PrimaryCostType',
      'PrimaryCostValue',
      'SecondaryCostType',
      'SecondaryCostValue',
    ].join(',');
    return this.getAPI(`/search?indexes=action&filters=${filters}&columns=${columns}`)
      .then((response) => response.Results)
      .then((response) => response.filter(a => a.ClassJobLevel !== 0));
  }
  static actionIndirection() {
    return this.getAPI(`/actionindirection`).then((response) => response.Results);
  }
  static getAPI(request) {
    return http.get(`${this.BASE_URL}${request}`).then((response) => response.data);
  }
}
XIVApi.BASE_URL = 'https://xivapi.com';

async function main() {
  console.log('Fetching action indirections...');
  const actionIndirections = (await XIVApi.actionIndirection())
    .filter((a) => a.Name)
    .reduce((prev, next) => {
      prev[ next.ID ] = next;
      return prev;
    }, {});

  console.log('Fetching jobs...');
  const jobs = (await XIVApi.jobs()).filter((job) => job.BattleClassIndex !== 0);

  console.log('Fetching job actions...');
  const jobsActions = await Promise.all(jobs.map((job) => XIVApi.actionsForJob(job, actionIndirections)));

  console.log('Writing files');
  fs.writeFileSync('./src/assets/classjobs.json', JSON.stringify(jobs));
  fs.writeFileSync('./src/assets/classjobactions.json', JSON.stringify(jobs.reduce((prev, job, index) => {
    prev[ job.ID ] = jobsActions[ index ];
    return prev;
  }, {})));
  fs.writeFileSync('./src/assets/actionindirections.json', JSON.stringify(actionIndirections));

  console.log('Done');
}

main();
