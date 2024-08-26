import { TokenCharts } from '../../modules/tokens/Tokens'

export const Analytics = () => {
  return (
    <div className="">
      <TokenCharts className="mt-[5.31rem] max-lg:mt-6" />
      {/* <TokenOverview className="mt-12 max-lg:px-4" />
      <Strategies
        className="mt-[6.25rem]"
        rowType="modal"
        withLink
        filters={{
          search: { value: '', placeholder: 'Name / Address / ID' },
          token: { items: SELECT_TOKENS, value: SELECT_TOKENS[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
          protocol: { items: SELECT_PROTOCOLS, value: SELECT_PROTOCOLS[0] },
        }}
      />
      <SankeyDiagramBasicDemo className="mt-[6.25rem]" />
      <Events
        className="mt-28 max-lg:mt-14"
        filters={{
          search: { value: '', placeholder: 'Tx hash  / Address' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
      />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.55rem] max-lg:mt-[4.5rem]" /> */}
    </div>
  )
}
