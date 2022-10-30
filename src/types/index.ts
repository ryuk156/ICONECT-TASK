export interface CustodianType {
  custodianName: string;
  custodianFiles: File[];
}

export interface ProgressBarType {
  filled: number;
}

export interface TextInputType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
