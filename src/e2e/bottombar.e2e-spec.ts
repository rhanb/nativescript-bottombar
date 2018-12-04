import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";
import { runType, isSauceLab } from "nativescript-dev-appium/lib/parser";

const isSauceRun = isSauceLab;
const isAndroid: Boolean = runType.includes("android");

describe("Bottom bar", () => {
    const defaultWaitTime = 15000;
    let driver: AppiumDriver;
    let bottomBar;
    const items  = [];

    before(async () => {
        driver = await createDriver();
        driver.defaultWaitTime = defaultWaitTime;
    });

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Driver successfully quit");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it("should find the bottombar", async () => {
        bottomBar = await driver.findElementByAccessibilityId("bottomBar", SearchOptions.exact);
        assert.exists(bottomBar);
    });

    it('should have 3 child', async() => {
        for (let i = 1; i < 4; i++) {
            items.push(
                await driver.findElementByAccessibilityId(`bottomBarItem${i}`, SearchOptions.exact)
            );
        }
        assert.equal(items.length, 3);
    });
});