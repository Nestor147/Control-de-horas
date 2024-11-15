export class SquadGroup {
    SquadName: string;
    EmployeeIds: string;
    MemberCount: number;

    constructor(params?: Partial<SquadGroup>) {
        this.SquadName = params?.SquadName ?? '';
        this.EmployeeIds = params?.EmployeeIds ?? '';
        this.MemberCount = params?.MemberCount ?? 0;
    }
}
