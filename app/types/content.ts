export interface ContentData {
  [key: string]: any;
}

export interface ContentEntry {
  id: string;
  data: ContentData;
}

export interface ContentDetail extends ContentEntry {
  body: string;
  bodyHtml: string;
}