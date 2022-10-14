export interface singleLegalEntitieType {
  id: number;
  name: string;
  contractStartedDate: string;
  contractEndDate: string;
  employeesCount: number | null;
  iin: number | null;
  status?: number | null;
  contractNumber: number | null;
}
