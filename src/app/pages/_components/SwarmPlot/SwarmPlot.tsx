import { ResponsiveSwarmPlot } from '@nivo/swarmplot'

export const SwarmPlot = ({ data, groups }: React.ComponentProps<typeof ResponsiveSwarmPlot>) => (
    <ResponsiveSwarmPlot
        data={data}
        groups={groups}
        value="price"
        valueFormat="$.2f"
        valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
        tooltip={(props) => <div style={{ padding: 12, backgroundColor: 'white', border: '1px solid black', borderRadius: 14 }}>{props.id}</div>}
        size={{
            key: 'volume',
            values: [
                4,
                20
            ],
            sizes: [
                6,
                20
            ]
        }}
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
    />
)
