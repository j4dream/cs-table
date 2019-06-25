import { convertToColumnHeader } from './util';

export default class TableStore {

  columnHeader = [];
  border = 1;

  constructor(opts) {
    this.columnHeader = convertToColumnHeader(opts.columnHeader);
    console.log(this.columnHeader);
  }


}