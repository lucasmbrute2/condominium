import { randomUUID } from 'node:crypto'

interface SyndicateProps {
  id?: string
  name: string
  username: string
  password: string
}

export class Syndicate {
  constructor(private readonly props: SyndicateProps) {
    const id = this.props?.id || props?.id || randomUUID()
    this.props = {
      ...props,
      id,
    }
  }

  get id(): string {
    return this.props.id
  }

  set name(name: string) {
    this.props.name = name
  }

  get name(): string {
    return this.props.name
  }

  set username(username: string) {
    this.props.username = username
  }

  get username(): string {
    return this.props.username
  }

  set password(password: string) {
    this.props.password = password
  }

  get password(): string {
    return this.props.password
  }
}
