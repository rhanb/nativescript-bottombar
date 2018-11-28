import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";
import { runType } from "nativescript-dev-appium/lib/parser";

const isAndroid: Boolean = runType.includes("android");

describe("Bottom bar", () => {
    const defaultWaitTime = 2000000;
    let driver: AppiumDriver;
    let bottomBar;
    const items  = [];

    before(async () => {
        driver = await createDriver();
        driver.defaultWaitTime = defaultWaitTime;
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
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