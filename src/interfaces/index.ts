export interface ErrorsEntity {
  rule: string
  field: string
  message: string
}

export interface IUser {
  uuid: string,
  name: string,
  email: string
}

export interface IProduct {
  uuid: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  created_at: string
  user?: IUser
}

export interface IMetaData {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  previous_page_url: string
}