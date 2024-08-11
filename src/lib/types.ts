import { Suitcase} from '@prisma/client'

export type SuitcaseEssentials = Omit<Suitcase, 'id' | 'updatedAt' | 'createdAt' | 'userId'>

export type TAuthTypes = 'login' | 'signup';

