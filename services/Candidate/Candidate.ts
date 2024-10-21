import { WithId } from "mongodb";

import { Position } from "../Data/Position";

import { CandidateEntity } from "./CandidateEntity";

import { OnlyRequired } from "@/libraries/OnlyRequired";

export class Candidate {
  private _value = new Map<string, any>();

  public static fromRepository(entity: WithId<CandidateEntity>) {
    const candidate = new Candidate();

    candidate._value.set("candidateId", entity._id.toString());
    candidate._value.set("name", entity.name);
    candidate._value.set("address", entity.address);
    candidate._value.set("position", entity.position);
    candidate._value.set("party", entity.party);
    candidate._value.set("coalition", entity.coalition);
    candidate._value.set("alias", entity.alias);
    candidate._value.set("gender", entity.gender);
    candidate._value.set("photoUrl", entity.photoUrl);
    candidate._value.set("email", entity.email);
    candidate._value.set("mobileNo", entity.mobileNo);

    return candidate;
  }

  constructor(value?: OnlyRequired<CandidateEntity>) {
    if (value) {
      this.name = value.name;
      this.position = value.position;
    }
  }

  toEntity() {
    return CandidateEntity.parse(this._value);
  }

  get candidateId(): string | undefined {
    return this._value.get("candidateId");
  }

  get name(): string {
    return this._value.get("name");
  }

  set name(value: string) {
    this._value.set("name", value);
  }

  get address(): string {
    return this._value.get("address");
  }

  set address(value: string) {
    this._value.set("address", value);
  }

  get position(): Position {
    return this._value.get("position");
  }

  set position(value: Position) {
    this._value.set("position", value);
  }

  get party(): string {
    return this._value.get("party");
  }

  set party(value: string) {
    this._value.set("party", value);
  }

  get coalition(): string {
    return this._value.get("coalition");
  }

  set coalition(value: string) {
    this._value.set("coalition", value);
  }

  get alias(): string {
    return this._value.get("alias");
  }

  set alias(value: string) {
    this._value.set("alias", value);
  }

  get gender(): string {
    return this._value.get("gender");
  }

  set gender(value: string) {
    this._value.set("gender", value);
  }

  get photoUrl(): string {
    return this._value.get("photoUrl");
  }

  set photoUrl(value: string) {
    this._value.set("photoUrl", value);
  }

  get email(): string {
    return this._value.get("email");
  }

  set email(value: string) {
    this._value.set("email", value);
  }

  get mobileNo(): string {
    return this._value.get("mobileNo");
  }

  set mobileNo(value: string) {
    this._value.set("mobileNo", value);
  }
}
