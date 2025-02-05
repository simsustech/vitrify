import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const RECOMMENDED_SALT_SIZE = 16
const RECOMMENDED_COST = Math.pow(2, 17)
const RECOMMENDED_BLOCK_SIZE = 8
const RECOMMENDED_PARALLELIZATION = 1

export const genSalt = ({ size = RECOMMENDED_SALT_SIZE }) => {
  return promisify(randomBytes)(size).then((buf) => buf.toString('hex'))
}

export const hash = (
  data: string,
  salt: string,
  {
    cost = RECOMMENDED_COST,
    blockSize = RECOMMENDED_BLOCK_SIZE,
    parallelization = RECOMMENDED_PARALLELIZATION
  }: { cost: number; blockSize: number; parallelization: number }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    scrypt(
      data,
      salt,
      64,
      {
        cost: cost,
        blockSize: blockSize,
        parallelization: parallelization,
        maxmem: 256 * cost * blockSize
      },
      (err, derivedKey) => {
        if (err) {
          reject(err)
        } else {
          resolve(derivedKey.toString('base64'))
        }
      }
    )
  })
}

export const hashPassword = async (
  data: string,
  options = {
    salt: { size: RECOMMENDED_SALT_SIZE },
    hash: {
      cost: RECOMMENDED_COST,
      blockSize: RECOMMENDED_BLOCK_SIZE,
      parallelization: RECOMMENDED_PARALLELIZATION
    }
  }
) => {
  const salt = await genSalt(options.salt)
  const hashedData = await hash(data, salt, options.hash)
  return [
    'scrypt',
    salt,
    options.hash.cost,
    options.hash.blockSize,
    options.hash.parallelization,
    hashedData
  ].join('$')
}

export const compare = async (data: string, hashed: string) => {
  const [algorithm, salt, cost, blockSize, parallelization, hashedData] =
    hashed.split('$')

  if (algorithm !== 'scrypt') throw new Error('Scrypt was not used for hash')

  const hashedDataToCompare = await hash(data, salt, {
    cost: Number(cost),
    blockSize: Number(blockSize),
    parallelization: Number(parallelization)
  })

  if (hashedDataToCompare === hashedData) return true
  return false
}
