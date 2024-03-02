import Entity from "@/schemas/entity";

enum LevelType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

type SentryError = Entity & {

    attributes : {
        archived: boolean,
        createdDate: string,
        title: string,
        message: string,
        url: string,
        location: string,
        projectId: number,
        release: string,
        level: LevelType
    }

}

export default SentryError;