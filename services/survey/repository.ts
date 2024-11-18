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
}
