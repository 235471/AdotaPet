export interface FormattedError {
    property: string;
    constraints: { [type: string]: string } | undefined;
  }