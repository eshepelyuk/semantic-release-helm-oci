import verifyChart from './lib/verifyConditions.js';
import prepareChart from './lib/prepare.js';
import publishChart from './lib/publish.js';

let verified = false;
let prepared = false;

export async function verifyConditions(pluginConfig, context) {
    await verifyChart(pluginConfig, context);
    verified = true;
}

export async function prepare(pluginConfig, context) {
    if (!verified) {
        await verifyChart(pluginConfig, context);
    }

    await prepareChart(pluginConfig, context);
    prepared = true;
}

export async function publish(pluginConfig, context) {
    if (!verified) {
        await verifyChart(pluginConfig, context);
    }
    if (!prepared) {
        await prepareChart(pluginConfig, context);
    }

    await publishChart(pluginConfig, context);
}
