type Constructor<T = unknown> = new () => T

const PROPS_KEY = 'swagger/apiModelPropertiesArray'
const META_KEY = 'swagger/apiModelProperties'

const resolveValue = (meta: Record<string, unknown>): unknown => {
  if (meta.example !== undefined) return meta.example
  if (meta.enum) return (meta.enum as unknown[])[0]
  if (meta.type) return extractExample(meta.type as Constructor)
  return undefined
}

export function extractExample<T>(DtoClass: Constructor<T>): T {
  const instance = new DtoClass()
  const proto = DtoClass.prototype as object
  const keys: string[] = Reflect.getMetadata(PROPS_KEY, proto) || []
  const record = instance as Record<string, unknown>

  keys
    .map((key) => key.replace(':', ''))
    .forEach((prop) => {
      const meta = Reflect.getMetadata(META_KEY, proto, prop)
      if (meta) record[prop] = resolveValue(meta as Record<string, unknown>)
    })

  return instance
}
