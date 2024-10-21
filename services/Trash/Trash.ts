import { TrashEntity } from "./TrashEntity";

import { OnlyRequired } from "@/libraries/OnlyRequired";

export class Trash {
  private _value = new Map<string, any>();

  constructor(value?: OnlyRequired<TrashEntity>) {
    if (value) {
      this.entityType = value.entityType;
      this.entityId = value.entityId;
      this.entity = value.entity;
      this.deletedBy = value.deletedBy;
    }
  }

  toEntity() {
    return TrashEntity.parse(this._value);
  }

  get trashId(): string {
    return this.entityType + "::" + this.entityId;
  }

  get entityType(): string {
    return this._value.get("entityType");
  }

  set entityType(value: string) {
    this._value.set("entityType", TrashEntity.shape.entityType.parse(value));
  }

  get entityId(): string {
    return this._value.get("entityId");
  }

  set entityId(value: string) {
    this._value.set("entityId", TrashEntity.shape.entityId.parse(value));
  }

  get entity(): Record<string, any> {
    return this._value.get("entity");
  }

  set entity(value: Record<string, any>) {
    this._value.set("entity", TrashEntity.shape.entity.parse(value));
  }

  get deletedBy(): string {
    return this._value.get("deletedBy");
  }

  set deletedBy(value: string) {
    this._value.set("deletedBy", TrashEntity.shape.deletedBy.parse(value));
  }

  get deletedOn(): Date {
    return this._value.get("deletedOn");
  }

  set deletedOn(value: Date) {
    this._value.set("deletedOn", TrashEntity.shape.deletedOn.parse(value));
  }
}
