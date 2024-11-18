import { ISurvey, Survey } from "./model";

import { BaseRepository } from "@/libraries/BaseRepository";

export class SurveyRepository extends BaseRepository<Survey, ISurvey & { createdOn: Date; updatedOn: Date }> {
  constructor() {
    super("survey", (survey) => {
      if (survey) {
        return {
          candidate: survey.candidate,
          status: survey.status,
          surveyId: survey._id.toHexString(),
          surveyor: survey.surveyor,
          validator: survey.validator,
          voter: survey.voter,
          createdOn: survey.createdOn,
          updatedOn: survey.updatedOn,
        };
      }
    });
  }

  async create(model: ISurvey) {
    const survey = await super.create({ ...model, createdOn: new Date(), updatedOn: new Date() });

    return survey;
  }

  async getListByCandidateAndVoters(candidateId: string, voterIds: Array<string>) {
    const result: Array<Survey> = [];

    const collection = await this.getCollection();
    const cursor = collection.find({ "candidate.candidateId": candidateId, "$voter.voterId": { $in: voterIds } });

    while (await cursor.hasNext()) {
      const document = await cursor.next();
      const model = this.transform(document);

      if (model) result.push(model);
    }

    return result;
  }
}
