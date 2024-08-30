export { ValidationError } from "joi";

export class NotFoundError extends Error {
  constructor() {
    super("Error: item not found");
  }
}

export class ListingError extends Error {
  constructor() {
    super("Error: failed to list item");
  }
}

export class SavingError extends Error {
  constructor() {
    super("Error: failed to add item");
  }
}

export class UpdateError extends Error {
  constructor() {
    super("Error: item not save");
  }
}

export class DeleteError extends Error {
  constructor() {
    super("Error: failed to remove item");
  }
}
