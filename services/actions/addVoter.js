"use server";

import VoterRepository from "../repositories/VoterRepository";
import { ApiResponse } from "../utilities/apiResponse";
import { db } from "../utilities/database";
import { SavingError, ZodError } from "../utilities/error";

export default async function addVoter(newVoter) {
  const response = new ApiResponse();
  const voterService = new VoterRepository();

  try {
    await db.connect()
    const voter = await voterService.addVoter(newVoter);

    response.data = voterService.toResponse(voter);
    response.success = true;
  } catch (err) {
    if (err instanceof SavingError) {
      response.error = "Failed to add voter";
    } else if (err instanceof ZodError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  } finally {
    await db.disconnect();
  }

  return response.toJson();
}