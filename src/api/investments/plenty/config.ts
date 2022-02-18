export type InvestmentKey = keyof typeof PlentyFarms;

export const PlentyFarms = {
  'uUSD - YOU': {
    ID: 'uUSD - YOU',
    LP_TOKEN: 'KT1Tmncfgpp4ZSp6aEogL7uhBqHTiKsSPegK',
    CONTRACT: 'KT1KGKzNGX1NDP3hGcipzyqVMCkwWbH76NJU',
    DEX: 'KT1TnrLFrdemNZ1AnnWNfi21rXg7eknS484C',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'uUSD / YOU LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=uUSD&tokenB=YOU',
    isDualFarm: false,
    message: 'YOU rewards 😍',
    bannerType: 'info',
  },

  'uUSD - uDEFI': {
    ID: 'uUSD - uDEFI',
    LP_TOKEN: 'KT1RQvdYD9yc763j8FiVLyXbKPVVbZqGRx5m',
    CONTRACT: 'KT1RENb4rWNFPP5QJSYT4rRGGsk1tPgLLwu2',
    DEX: 'KT1EAw8hL5zseB3SLpJhBqPQfP9aWrWh8iMW',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'uUSD / uDEFI LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=uUSD&tokenB=uDEFI',
    isDualFarm: false,
    message: 'YOU rewards 😍',
    bannerType: 'info',

    inactive: [],
  },
  'PLENTY - cTez': {
    ID: 'PLENTY - cTez',
    LP_TOKEN: 'KT1LdX5pUkZZGwYPePcAFSpETbqfbGCwJpfw',
    CONTRACT: 'KT1MfMMsYX34Q9cEaPtk4qkQ6pojA7D2nsgr',
    DEX: 'KT1C9gJRfkpPbNdBn3XyYbrUHT6XgfPzZqXP',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / cTez LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=ctez',
    isDualFarm: false,

    inactive: [],
  },
  //QUIPI-SWAP
  // 'PLENTY - XTZ': {
  //   ID: 'PLENTY - XTZ',
  //   LP_TOKEN: 'KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z',
  //   CONTRACT: 'KT1JQAZqShNMakSNXc2cgTzdAWZFemGcU6n1',
  //   DEX: 'KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z',
  //   TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
  //   CARD_TYPE: 'PLENTY / XTZ LP',
  //   TOKEN_DECIMAL: 6,
  //   TYPE: 'FA1.2',
  //   LP_DECIMAL: 18,
  //   TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
  //   DECIMAL: 18,
  //   withdrawalFeeType: 'type2',
  //   liquidityLink:
  //     'https://quipuswap.com/invest/add-liquidity/KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
  //   isDualFarm: false,
  // },
  'PLENTY - wBUSD': {
    ID: 'PLENTY - wBUSD',
    LP_TOKEN: 'KT1UC3vcVZ4K9b39uQxaMNA2N1RuJXKLCnoA',
    CONTRACT: 'KT1KJhxkCpZNwAFQURDoJ79hGqQgSC9UaWpG',
    DEX: 'KT1XXAavg3tTj12W1ADvd3EEnm1pu6XTmiEF',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wBUSD LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 18,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wBUSD',
    isDualFarm: false,
  },
  'PLENTY - wUSDC': {
    ID: 'PLENTY - wUSDC',
    LP_TOKEN: 'KT1Gz1mx1jm7JHqU7GuMVWF6soB9RjsfLN3o',
    CONTRACT: 'KT1Kp3KVT4nHFmSuL8bvETkgQzseUYP3LDBy',
    DEX: 'KT1PuPNtDFLR6U7e7vDuxunDoKasVT6kMSkz',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wUSDC LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wUSDC',
    isDualFarm: false,
  },
  'PLENTY - wWBTC': {
    ID: 'PLENTY - wWBTC',
    LP_TOKEN: 'KT1La1qZiJtDRcd9ek8w5KYD47i9MQqAQHmP',
    CONTRACT: 'KT1M82a7arHVwcwaswnNUUuCnQ45xjjGKNd1',
    DEX: 'KT19Dskaofi6ZTkrw3Tq4pK7fUqHqCz4pTZ3',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wWBTC LP',
    TOKEN_DECIMAL: 13,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wWBTC',
    isDualFarm: false,

    inactive: [],
  },
  'PLENTY - wMATIC': {
    ID: 'PLENTY - wMATIC',
    LP_TOKEN: 'KT1WCGPFvy97wwGxewKfvTr1QYPvpEgUKToS',
    CONTRACT: 'KT1UP9XHQigWMqNXYp9YXaCS1hV9jJkCF4h4',
    DEX: 'KT1VeNQa4mucRj36qAJ9rTzm4DTJKfemVaZT',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wMATIC LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wMATIC',
    isDualFarm: false,
  },
  'PLENTY - wLINK': {
    ID: 'PLENTY - wLINK',
    LP_TOKEN: 'KT1Brqb3JvXNKzwjW82F8pUAxQ7ipCfApWki',
    CONTRACT: 'KT1UqnQ6b1EwQgYiKss4mDL7aktAHnkdctTQ',
    DEX: 'KT1XVrXmWY9AdVri6KpxKo4CWxizKajmgzMt',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wLINK LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wLINK',
    isDualFarm: false,
  },
  'PLENTY - USDtz': {
    ID: 'PLENTY - USDtz',
    LP_TOKEN: 'KT18qSo4Ch2Mfq4jP3eME7SWHB8B8EDTtVBu',
    CONTRACT: 'KT1VCrmywPNf8ZHH95HKHvYA4bBQJPa8g2sr',
    DEX: 'KT1D36ZG99YuhoCRZXLL86tQYAbv36bCq9XM',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / USDtz LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=USDtz',
    isDualFarm: false,
  },
  'PLENTY - hDAO': {
    ID: 'PLENTY - hDAO',
    LP_TOKEN: 'KT1B2SzTBtb7PgTePbDLV5BmUZQ2PC1sdSHZ',
    CONTRACT: 'KT1W3DtcPXbD7MMmtUdk3F352G6CYFSpwUUS',
    DEX: 'KT1XutoFJ9dXvWxT7ttG86N2tSTUEpatFVTm',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / hDAO LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=hDAO',
    isDualFarm: false,
  },
  'PLENTY - ETHtz': {
    ID: 'PLENTY - ETHtz',
    LP_TOKEN: 'KT1VvcbAjMWHVUbhLENpiVBejbzXYDt3PusE',
    CONTRACT: 'KT1EVfYFoSpte3PnE4tPoWuj1DhNPVQwrW5Y',
    DEX: 'KT1AbuUaPQmYLsB8n8FdSzBrxvrsm8ctwW1V',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / ETHtz LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=ETHtz',
    isDualFarm: false,
  },
  'PLENTY - wWETH': {
    ID: 'PLENTY - wWETH',
    LP_TOKEN: 'KT1SULRhejhoBWUmMnU53YHJrQZ3rxqsamdm',
    CONTRACT: 'KT1CBh8BKFV6xAH42hEdyhkijbwzYSKW2ZZC',
    DEX: 'KT1HUnqM6xFJa51PM2xHfLs7s6ARvXungtyq',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wWETH LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wWETH',
    isDualFarm: false,
  },
  'PLENTY - kUSD': {
    ID: 'PLENTY - kUSD',
    LP_TOKEN: 'KT1XTpd8JPexGxBL2dAmU9h2o9fcd9LEUG2t',
    CONTRACT: 'KT1MmAy4mSbZZVzPoYbK3M4z3GWUo54UTiQR',
    DEX: 'KT1UNBvCJXiwJY6tmHM7CJUVwNPew53XkSfh',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / kUSD LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=kUSD',
    isDualFarm: false,
  },
  'PLENTY - WRAP': {
    ID: 'PLENTY - WRAP',
    LP_TOKEN: 'KT1AHndbp9xVpaJrfTHfYzSXKHDVHMdKxcW2',
    CONTRACT: 'KT1K9kLuhq9AJjDAgbJdKGBiP9927WsRnjP6',
    DEX: 'KT1C2SXoGcje3VVMJHKRVhYXuWuNmv5ztJcw',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / WRAP LP',
    TOKEN_DECIMAL: 13,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=WRAP',
    isDualFarm: false,
  },
  'PLENTY - KALAM': {
    ID: 'PLENTY - KALAM',
    LP_TOKEN: 'KT1G3QTnrpWNhZr9x3Prprw3GH6gAMqV113D',
    CONTRACT: 'KT1UTvMuyRggQe9q1hrh7YLh7vxffX2egtS6',
    DEX: 'KT1HZkD2T4uczgYkZ6fb9gm1fymeJoRuezLz',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / KALAM LP',
    TOKEN_DECIMAL: 14,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=KALAM',
    isDualFarm: false,
  },
  'PLENTY - tzBTC': {
    ID: 'PLENTY - tzBTC',
    LP_TOKEN: 'KT1SqQimKz3RbQbckpSHhn4nanUmDuRqkFH3',
    CONTRACT: 'KT1RwFV1xQU2E9TsXe1qzkdwAgFWaKk8bfAa',
    DEX: 'KT1HaDP8fRW7kavK2beST7o4RvzuvZbn5VwV',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / tzBTC LP',
    TOKEN_DECIMAL: 13,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=tzBTC',
    isDualFarm: false,
  },
  'PLENTY - uUSD': {
    ID: 'PLENTY - uUSD',
    LP_TOKEN: 'KT1E8CrG6uznYAG9vZVGtApMJwwTScxPEUKq',
    CONTRACT: 'KT1HSYQ9NLTQufuvNUwMhLY7B9TX8LDUfgsr',
    DEX: 'KT1Cba383ZJpEearqnUyUKUMsgu5Z3TXBgeH',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / uUSD LP',
    TOKEN_DECIMAL: 14,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=uUSD',
    isDualFarm: false,
  },

  'PLENTY - wDAI': {
    ID: 'PLENTY - wDAI',
    LP_TOKEN: 'KT19vdNapeT6MALXvkvW745KiVKGXmD4AZq5',
    CONTRACT: 'KT1FJzDx9AwbuNHjhzQuUxxKUMA9BQ7DVfGn',
    DEX: 'KT1KDmpYSDogNtEtEnEaHQLaySuqLr8aEfJW',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wDAI LP',
    TOKEN_DECIMAL: 18,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wDAI',
    isDualFarm: false,
  },
  'PLENTY - wUSDT': {
    ID: 'PLENTY - wUSDT',
    LP_TOKEN: 'KT1PcM1LUqgVdkXqKvZ4CeC9aiwLgYYCEHMH',
    CONTRACT: 'KT1S4XjwGtk55TmsMqSdazEMrH4pGA3NMXhz',
    DEX: 'KT1Bi4yoALg6tuP4PKaFNDtSsDdpGLrDiGAS',
    TOKEN_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    CARD_TYPE: 'PLENTY / wUSDT LP',
    TOKEN_DECIMAL: 12,
    TYPE: 'FA1.2',
    LP_DECIMAL: 12,
    TEMP_ADDRESS: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    DECIMAL: 18,
    withdrawalFeeType: 'type2',
    liquidityLink: '/liquidity/add?tokenA=PLENTY&tokenB=wUSDT',
    isDualFarm: false,
  },
};