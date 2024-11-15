export interface Squad {
    Id:                         number;
    Name:                       string;
    Leader:                     string;
    Members:                    string[];
    DefaultArea:                string;
    DefaultIteration:           string;
    Manager:                    string;
    KanbanPrefix:               string;
    KanbanLaneName:             string;
    KanbanColumnName:           string;
    ProjectName:                string;
    EnablePerformanceAppraisal: boolean;
    TaskDurationLimit:          number | null;
}

export enum Manager {
    KleytonFazolin = "kleyton.fazolin",
    VictorChuquimia = "victor.chuquimia",
    WesleyMazzo = "wesley.mazzo",
}
