import { gql } from '@apollo/client'

export interface progressInterface {
	id: number
	attributes: {
		createdAt: Date
		updatedAt: Date
		course: {
			data: {
				id: number
				attributes: {
					name: string
					description: string
					icons: {
						data: {
							attributes: {
								name: string
								url: string
							}
						}[]
					}
					modules: {
						data: {
							id: number
							attributes: {
								lessons: {
									data: {
										id: number
									}[]
								}
								tests: {
									data: {
										id: number
									}[]
								}
							}
						}[]
					}
				}
			}
		}
		modules: {
			data: {
				id: number
			}[]
		}
		lessons: {
			data: {
				id: number
			}[]
		}
		tests: {
			data: {
				id: number
			}[]
		}
	}
}

export const learningsQuery = (userId: number) => gql`
    query getUserProgresses {
        userProgresses(
            filters: { users_permissions_user: { id: { eq: ${userId} } } }
        ) {
            data {
                id
                attributes {
                    createdAt
                    updatedAt
                    course {
                        data {
                            id
                            attributes {
                                name
                                description
                                icons {
                                    data {
                                        attributes {
                                            name
                                            url
                                        }
                                    }
                                }
                                modules {
                                    data {
                                        id
                                        attributes {
                                            lessons {
                                                data {
                                                    id
                                                }
                                            }
                                            tests {
                                                data {
                                                    id
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    modules {
                        data {
                            id
                        }
                    }
                    lessons {
                        data {
                            id
                        }
                    }
                    tests {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`