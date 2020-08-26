import { tscov } from './tscov/tscov'

export function index(): Promise<any> {
  return tscov()
}

index()
