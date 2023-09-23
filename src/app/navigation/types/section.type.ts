import { SubSection } from './sub-section.type'

export interface Section {
  name: string
  sublinks: SubSection[]
  isOpen: boolean
  urlLink: string
}
