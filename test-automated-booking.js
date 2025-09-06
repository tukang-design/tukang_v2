const puppeteer = require("puppeteer");

async function testBookingForm() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    defaultViewport: { width: 1280, height: 720 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("🚀 Starting automated booking form test...");

    // Navigate to the booking page
    await page.goto("http://localhost:3002/booking", {
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    console.log("✅ Page loaded successfully");

    // Step 1: Select a service package
    console.log("📋 Step 1: Selecting service package...");
    await page.waitForSelector(
      '[data-testid="service-business-website"], .service-card:nth-child(2)',
      { timeout: 5000 }
    );

    // Click on "The Business Website" service
    const serviceCard =
      (await page.$(".service-card:nth-child(2)")) ||
      (await page.$('[data-service="business-website"]'));
    if (serviceCard) {
      await serviceCard.click();
      console.log('✅ Selected "The Business Website" package');
    } else {
      // Fallback: click any visible service card
      await page.click('.cursor-pointer[onclick*="setSelectedService"]');
      console.log("✅ Selected first available service package");
    }

    // Wait and proceed to next step
    await page.waitForTimeout(1000);

    // Click Next or Continue button
    const nextButton =
      (await page.$('button:contains("Next")')) ||
      (await page.$('button:contains("Continue")')) ||
      (await page.$(".bg-accent"));
    if (nextButton) {
      await nextButton.click();
      console.log("✅ Proceeded to configurator");
    }

    // Step 2: Configure options (domain, addons, etc.)
    console.log("📋 Step 2: Configuring project options...");
    await page.waitForTimeout(2000);

    // Select domain option (new domain)
    const newDomainOption = await page.$('[onclick*="domain"][onclick*="new"]');
    if (newDomainOption) {
      await newDomainOption.click();
      console.log("✅ Selected new domain option");
    }

    // Select payment plan (installments)
    const installmentOption = await page.$(
      '[onclick*="paymentPlan"][onclick*="installments"]'
    );
    if (installmentOption) {
      await installmentOption.click();
      console.log("✅ Selected installment payment plan");
    }

    // Select some addons
    const addonCheckboxes = await page.$$(
      '.cursor-pointer[onclick*="selectedAddons"]'
    );
    if (addonCheckboxes.length > 0) {
      // Select first 2 addons
      await addonCheckboxes[0].click();
      await page.waitForTimeout(500);
      await addonCheckboxes[1].click();
      console.log("✅ Selected 2 addons");
    }

    // Continue to next step
    await page.waitForTimeout(1000);
    const continueBtn =
      (await page.$('button:contains("Continue")')) ||
      (await page.$(".bg-accent"));
    if (continueBtn) {
      await continueBtn.click();
      console.log("✅ Proceeded to project brief");
    }

    // Step 3: Fill project brief
    console.log("📋 Step 3: Filling project brief...");
    await page.waitForTimeout(2000);

    // Fill business name
    const businessNameInput = await page.$(
      'input[value*="businessName"], input[placeholder*="business"]'
    );
    if (businessNameInput) {
      await businessNameInput.click();
      await businessNameInput.type("Automated Test Business");
      console.log("✅ Filled business name");
    }

    // Fill business description
    const businessDescTextarea = await page.$(
      'textarea[value*="businessDescription"], textarea[placeholder*="business"]'
    );
    if (businessDescTextarea) {
      await businessDescTextarea.click();
      await businessDescTextarea.type(
        "This is an automated test of the booking system to verify all fields are captured correctly."
      );
      console.log("✅ Filled business description");
    }

    // Select main goal
    const mainGoalOptions = await page.$$('[onclick*="mainGoal"]');
    if (mainGoalOptions.length > 0) {
      await mainGoalOptions[0].click();
      console.log("✅ Selected main goal");
    }

    // Continue to contact form
    const nextToContact =
      (await page.$('button:contains("Continue")')) ||
      (await page.$(".bg-accent"));
    if (nextToContact) {
      await nextToContact.click();
      console.log("✅ Proceeded to contact form");
    }

    // Step 4: Fill contact information
    console.log("📋 Step 4: Filling contact information...");
    await page.waitForTimeout(2000);

    // Fill contact fields
    const contactFields = {
      name: "John Doe Automated Test",
      email: "automated.test@example.com",
      company: "Test Company Inc",
      phone: "+1-555-123-4567",
    };

    for (const [field, value] of Object.entries(contactFields)) {
      const input = await page.$(
        `input[name="${field}"], input[placeholder*="${field}"]`
      );
      if (input) {
        await input.click();
        await input.clear();
        await input.type(value);
        console.log(`✅ Filled ${field}: ${value}`);
      }
    }

    // Submit the form
    console.log("📋 Step 5: Submitting form...");
    const submitButton =
      (await page.$('button:contains("Submit")')) ||
      (await page.$('button:contains("Send Quote")')) ||
      (await page.$('.bg-accent[type="submit"]'));

    if (submitButton) {
      // Intercept the API call to see what data is being sent
      let submissionData = null;
      page.on("request", (request) => {
        if (
          request.url().includes("/api/submit-quote") &&
          request.method() === "POST"
        ) {
          submissionData = request.postData();
          console.log("📤 Captured form submission data:", submissionData);
        }
      });

      await submitButton.click();
      console.log("✅ Form submitted successfully!");

      // Wait for submission to complete
      await page.waitForTimeout(3000);

      // Check for success message or thank you page
      const successIndicators = await page.$(
        '.text-accent:contains("thank"), .success, [class*="success"]'
      );
      if (successIndicators) {
        console.log("🎉 Success page detected - form submission completed!");
      }

      // Log the submission data for verification
      if (submissionData) {
        console.log("\n📋 SUBMISSION DATA VERIFICATION:");
        const data = JSON.parse(submissionData);
        console.log("Package Name:", data.selectedService?.name || "MISSING");
        console.log(
          "Add-on Services:",
          data.services?.map((s) => s.name).join(", ") || "MISSING"
        );
        console.log(
          "Domain Choice:",
          data.projectConfiguration?.domain || "MISSING"
        );
        console.log(
          "Payment Plan:",
          data.projectConfiguration?.paymentPlan || "MISSING"
        );
        console.log(
          "Business Name:",
          data.projectBrief?.businessName || "MISSING"
        );
        console.log("Contact Name:", data.name || "MISSING");
        console.log("Estimated Price:", data.estimatedPrice || "MISSING");
      }
    } else {
      console.log("❌ Submit button not found");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    // Keep browser open for 5 seconds to see results
    await page.waitForTimeout(5000);
    await browser.close();
    console.log("🏁 Test completed");
  }
}

// Run the test
testBookingForm().catch(console.error);
