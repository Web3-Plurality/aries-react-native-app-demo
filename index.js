/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values'

import type { InitConfig } from '@aries-framework/core'
import { Agent, WsOutboundTransport, HttpOutboundTransport } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'



/*const config: InitConfig = {
  label: 'docs-rn-agent',
  walletConfig: {
    id: 'wallet-id',
    key: 'testkey0000000000000000000000000',
  },
}

const agent = new Agent({
  config,
  dependencies: agentDependencies,
})

agent.registerOutboundTransport(new WsOutboundTransport())
agent.registerOutboundTransport(new HttpOutboundTransport())

const initialize = async () => await agent.initialize().catch(console.error)*/

const initializeBobAgent = async () => {
  // Simple agent configuration. This sets some basic fields like the wallet
  // configuration and the label. It also sets the mediator invitation url,
  // because this is most likely required in a mobile environment.
  const config: InitConfig = {
    label: 'demo-agent-bob',
    walletConfig: {
      id: 'mainBob',
      key: 'demoagentbob00000000000000000000',
    },
    autoAcceptConnections: true,
  }

  // A new instance of an agent is created here
  const agent = new Agent({ config, dependencies: agentDependencies })

  // Register a simple `WebSocket` outbound transport
  agent.registerOutboundTransport(new WsOutboundTransport())

  // Register a simple `Http` outbound transport
  agent.registerOutboundTransport(new HttpOutboundTransport())

  // Initialize the agent
  await agent.initialize().catch(console.error)

  return agent
}

const receiveInvitation = async (agent: Agent, invitationUrl: string) => {
  const { outOfBandRecord } = await agent.oob.receiveInvitationFromUrl(invitationUrl).catch(console.error)

  return outOfBandRecord
}

const run = async () => {
  console.log('Initializing Bob agent...')
  const bobAgent = await initializeBobAgent()
  const invitationUrl = 'https://0f1d-195-13-40-70.eu.ngrok.io?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiIwNzg1Mzg2Zi1kMjQxLTQ3MmEtOTgwZC0zOTZlMzk0MDc5MmUiLCJsYWJlbCI6ImRlbW8tYWdlbnQtYWNtZSIsImFjY2VwdCI6WyJkaWRjb21tL2FpcDEiLCJkaWRjb21tL2FpcDI7ZW52PXJmYzE5Il0sImhhbmRzaGFrZV9wcm90b2NvbHMiOlsiaHR0cHM6Ly9kaWRjb21tLm9yZy9kaWRleGNoYW5nZS8xLjAiLCJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMCJdLCJzZXJ2aWNlcyI6W3siaWQiOiIjaW5saW5lLTAiLCJzZXJ2aWNlRW5kcG9pbnQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa3VyVVk2Y2V1akZvV21mYnJ0UkNGV0c3ZWM3M2NLcndmRHNhVW1VQ1lDM3RwIl0sInJvdXRpbmdLZXlzIjpbXX1dfQ'
  console.log(`connecting on invitation url ${invitationUrl}`)
  console.log('Accepting the invitation as Bob...')
  try {
  await receiveInvitation(bobAgent, invitationUrl)
  console.log("invitation received")

  }
  catch (e) {
    console.log(e)
  }
  console.log("All done")
}

export default run

void run()

AppRegistry.registerComponent(appName, () => App);
