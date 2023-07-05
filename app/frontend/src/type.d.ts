interface Meeting {
    id: number
    category: string
    student: string
    problem: string
    notes: string
    studentEmail: string
    createdAt: string
    updatedAt: string
}

interface User {
    createdAt: string
    email: string
    firstName: string
    id: number
    lastName: string
    meetings: Meeting[]
}

interface Session { 
    user: User
}

type SessionState = {
    session: Session
}

type SessionAction = {
    type: string
    payload: Session
}

type DispatchSessionType = (args: SessionAction) => SessionAction

//

interface Error {
    messages: string
}

type SessionErrorsState = {
    errors: Error[]
}

type SessionErrorsAction = {
    type: string
    errors: Error[]
}

type DispatchSessionErrorType = (args: SessionErrorsAction) => SessionErrorsAction