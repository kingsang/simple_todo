import uuid from 'uuid';
import dayjs from 'dayjs';

export class Todo {
  constructor(id, content, created_at, status) {
    this.id = id;
    this.content = content;
    this.created_at = created_at;
    this.status = status;
  }

  static make(content) {
    return new Todo(
      uuid.v4(),
      content,
      dayjs(),
      STATUS.ACTIVE,
    );
  }

  edit(content) {
    return new Todo(
      this.id,
      content,
      this.created_at,
      this.status
    );
  }

  archive() {
    this.status = STATUS.ARCHIVE;
  }

  toJson() {
    return JSON.stringify(
      {
        id: this.id,
        content: this.content,
        created_at: this.created_at.format("YYYY-MM-DD HH:mm:ss"),
        status: this.status
      }
    )
  }

  static fromJsonObject(json) {
    return new Todo(json.id, json.content, dayjs(json.created_at, "YYYY-MM-DD HH:mm:ss"), json.status)
  }
}

export const STATUS = {
  ACTIVE: 0,
  ARCHIVE: 1
};