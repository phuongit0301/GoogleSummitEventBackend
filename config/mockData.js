const jsonResponse = {
  "data": {
    "questions": [
      {
        "id": 1,
        "description": "<strong>Enabling cloud services and technology across a multi-country organisation is a challenge.</strong><p>As it is, your company adopts different operational processes, compliance, and infrastructure when it comes to the various technology ecosystems. To implement a region-wide digital transformation project efficiently, do you...</p>",
        "answers": [
          {
            "title": "<strong>Map business priorities against available solutions before investing in any technology partner/s.</strong><p>Build and execute a programmatic adoption and enablement program only after partners and solutions are defined</p>",
            "pros": "<p class='txt-title'>- Reduces operational risk</p><p class='txt-title'>- Maps business requirements to technology solutions</p><p class='txt-title'>- Senior stakeholders get this model</p>",
            "cons": "<p class='txt-title'>- Significant upfront diligence</p><p class='txt-title'>- Often fails or stalls due to running overtime or over budget</p><p class='txt-title'>- Not able to demonstrate immediate results to company</p>",
            "cost": 10,
            "productivity": 13,
            "productivityStatus": "Low",
            "peopleImpact": 1,
            "peopleImpactShow": '+',
            "invesmentCostStatus": "Medium",
            "isPassed": true
          },
          {
            "title": "<strong>Adopt a hybrid cloud strategy. Plan to modernize your services to move between on-premise and cloud.</strong><p>Implement this strategy to increase agility and portability between on-premise and cloud provider services on regional scales.</p>",
            "pros": "<p class='txt-title'>- Eliminates vendor lock-in</p><p class='txt-title'>- Allows customers to adopt best-in-class solutions across providers, data portability</p><p class='txt-title'>- Fast start, quick win to demonstrate values</p>",
            "cons": "",
            "cost": 15,
            "productivity": 19,
            "productivityStatus": "Low",
            "peopleImpact": 2,
            "peopleImpactShow": '++',
            "invesmentCostStatus": "High",
            "isPassed": false
          },
          {
            "title": "<strong>Move your existing processes and solutions to cloud. Modernize your services once migrated, if possible.</strong><p>Perform a \"lift and shift\" methodology, and investigate modernising your services only after migration.</p>",
            "pros": "<p class='txt-title'>- Eliminates any change management objections</p><p class='txt-title'>- Existing processes barely change</p>",
            "cons": "<p class='txt-title'>- Bad practices follow the customer to the cloud</p><p class='txt-title'>- Have constraints in ways to consume cloud, lose flexibility</p><p class='txt-title'>- Trying to jam on-prem solutions to cloud</p>",
            "cost": 5,
            "productivity": 7,
            "productivityStatus": "Low",
            "peopleImpact": 0,
            "peopleImpactShow": '0',
            "invesmentCostStatus": "Low",
            "isPassed": false
          }
        ]
      },
      {
        "id": 2,
        "description": "<strong>You ultimately decided on a hybrid cloud strategy to accommodate both on-premise and multiple cloud providers. However...</strong><p>This may mean using some open-source technologies. To better embrace this new environment of technology, do you...</p>",
        "answers": [
          {
            "title": "<strong>Build your \"custom-made\" implementations of open-source technologies.</strong><p>Open-source technologies like Kubernetes, TensorFlow, Apache Hadoop, etc can be custom-fit to address your specific business needs.</p>",
            "pros": "<p class='txt-title'>- Open source is free</p><p class='txt-title'>- No vendor lock-in, deployed on your choice of infrastructure, same tooling across on-prem and cloud</p><p class='txt-title'>- Have full control for complinace and regulations</p>",
            "cons": "<p class='txt-title'>- Increases operational overheads</p><p class='txt-title'>- Significant investment in human capital</p><p class='txt-title'>- No vendor support</p>",
            "cost": 20,
            "productivity": 30,
            "productivityStatus": "Medium",
            "peopleImpact": 1,
            "peopleImpactShow": "+",
            "invesmentCostStatus": "High",
            "isPassed": false
          },
          {
            "title": "<strong>Use a vendor managed cloud service pre-built on open-source technology platforms.</strong><p>Using these services will allow for flexibility of terms and modularity of solutions to allow for trial and active evaluation.</p>",
            "pros": "<p class='txt-title'>- Zero start-up cost, pay-as-you-go model</p><p class='txt-title'>- Reduces operational overhead, investment in human capital and implementation timelines</p><p class='txt-title'>- Allows for workload & IP portability</p>",
            "cons": "<p class='txt-title'>- Typically signifies a level of vendor lock in</p><p class='txt-title'>- Need to invest in migration from one vendor to another</p>",
            "cost": 5,
            "productivity": 10,
            "productivityStatus": "High",
            "peopleImpact": 0,
            "peopleImpactShow": '0',
            "invesmentCostStatus": "Low",
            "isPassed": true
          },
          {
            "title": "<strong>Deploy a vendor-supported, multi-cloud solution to enable workload agility and portability.</strong><p>Deploy an infrastructure that facilitates consistency and portability of open-source technologies across multiple cloud providers and on-premise setups.</p>",
            "pros": "<p class='txt-title'>- Relatively low start-up cost</p><p class='txt-title'>- No vendor lock-in</p><p class='txt-title'>- Standardised processes across on-premise and cloud</p>",
            "cons": "<p class='txt-title'>- Requires investment in human capital</p><p class='txt-title'>- Increases workload portability and agility</p>",
            "cost": 15,
            "productivity": 30,
            "productivityStatus": "High",
            "peopleImpact": 1,
            "peopleImpactShow": "+",
            "invesmentCostStatus": "High",
            "isPassed": false
          }
        ]
      },
      {
        "id": 4,
        "description": "<strong>Consult with your chosen cloud providers for best practices to enable your team</strong><p>They have concerns regarding change management, service provisioning, cost at risk vs capacity at risk and vendor lock-in. Do you...</p>",
        "answers": [
          {
            "title": "<strong>Consult with your chosen cloud providers for best practices.</strong><p>Let them provide recommendations, adoption methodologies and governance frameworks based on past and current experiences when it comes to using their services.</p>",
            "pros": "<p class='txt-title'>- Leverages best practices from \"first mover\" companies</p><p class='txt-title'>- Reduces risk profile</p>",
            "cons": "<p>-</p>",
            "cost": 5,
            "productivity": 7,
            "productivityStatus": "Low",
            "peopleImpact": 1,
            "peopleImpactShow": '+',
            "invesmentCostStatus": "Low",
            "isPassed": false
          },
          {
            "title": "<strong>Encourage the team to perform their own diligence.</strong><p>Allow them to increase their comfort and skills with each component of new technology prior to implementation in production.</p>",
            "pros": "<p class='txt-title'>- Increases internal skills relating to cloud adoption</p>",
            "cons": "<p class='txt-title'>- Slower time to production</p><p class='txt-title'>- Possibly increases risk profile if correct diligence not performed</p>",
            "cost": 10,
            "productivity": 12,
            "productivityStatus": "Low",
            "peopleImpact": 2,
            "peopleImpactShow": '++',
            "invesmentCostStatus": "Medium",
            "isPassed": true
          },
          {
            "title": "<strong>Outsource the overall management of your new technology environment.</strong><p>Hire third-party systems integrator(s) to manage your new environment with mutually agreed SLAs and associated penalties.</p>",
            "pros": "<p class='txt-title'>- Moves to an SLA based consumption model with your partner of choice</p>",
            "cons": "<p class='txt-title'>- No development of internal skill set</p><p class='txt-title'>- No ownership of IP</p>",
            "cost": 15,
            "productivity": 20,
            "productivityStatus": "Medium",
            "peopleImpact": -1,
            "peopleImpactShow": '-',
            "invesmentCostStatus": "High",
            "isPassed": false
          }
        ]
      },
      {
        "id": 5,
        "description": "<strong>Your task now is to set up smart analytics and infrastructure for your firm across different geographical regions and regulatory jurisdictions.</strong><p>Your goal:  to speed up product releases and to set up the foundation for AI in your company. Do you...</p>",
        "coinsIncrement": -5,
        "answers": [
          {
            "title": "<strong>Partner directly with a third-party public cloud provider to co-create solutions and enablement plans.</strong><p>Build up a solution from their catalogue of services to manage your company's data and infrastructure</p>",
            "pros": "<p class='txt-title'>- Fast start, and quicker to deliver</p>",
            "cons": "<p class='txt-title'>- Possible vendor lock-in</p><p class='txt-title'>- Harder to customise</p><p class='txt-title'>- May encounter talent challenge</p>",
            "cost": 5,
            "productivity": 10,
            "productivityStatus": "High",
            "peopleImpact": 1,
            "peopleImpactShow": '+',
            "invesmentCostStatus": "Low",
            "isPassed": false
          },
          {
            "title": "<strong>Hire a third-party consultancy for recommendations and get the team to evaluate those options. </strong><p>Let them evaluate the best path to take before engaging any solution providers.</p>",
            "pros": "<p class='txt-title'>- Unbiased opinion on the market</p><p class='txt-title'>- Typical enterprise engagement embraced by senior leaders</p><p class='txt-title'>- More diligent in the overall process</p>",
            "cons": "<p class='txt-title'>- Slower to establish a program of work</p><p class='txt-title'>- Results can be outdated by the time the process completes</p>",
            "cost": 20,
            "productivity": 25,
            "productivityStatus": "Low",
            "peopleImpact": 2,
            "peopleImpactShow": '++',
            "invesmentCostStatus": "High",
            "isPassed": true
          },
          {
            "title": "<strong>Upskill your current teams, then have your team to evaluate options and choose one collaboratively</strong><p>They will be tasked to build on-premise and cloud-based solutions based on internal evaluation of your organisational and technology needs.</p>",
            "pros": "<p class='txt-title'>- ROI may pay off in the future by avoiding common cloud adoption challenges</p>",
            "cons": "<p class='txt-title'>- Investing in human capital at the detriment of speed</p>",
            "cost": 15,
            "productivity": 23,
            "productivityStatus": "Medium",
            "peopleImpact": 1,
            "peopleImpactShow": '+',
            "invesmentCostStatus": "High",
            "isPassed": false
          }
        ]
      },
      {
        "id": 6,
        "description": "<strong>Your organisation has so far been working with segregated development environments and data silos to meet regulatory and compliance rules, and you've been tasked to eliminate these silos.</strong><p>You decide that the first step to doing this is to migrate non-Personally Identifiable Information (PII) to a centralised system. Do you...</p>",
        "coinsIncrement": -5,
        "answers": [
          {
            "title": "<strong>Use a best of breed third-party solution to fulfill this specific purpose.</strong><p>Investigate dedicated and separate vendor solutions for this purpose and select one of their third-party SaaS solutions to store your organisation's data.</p>",
            "pros": "<p class='txt-title'>- Faster to deploy</p><p class='txt-title'>- Least resistance from stakeholders</p>",
            "cons": "<p class='txt-title'>- Not customisable</p><p class='txt-title'>- Vendor lock-in</p>",
            "cost": 15,
            "productivity": 30,
            "productivityStatus": "High",
            "peopleImpact": 0,
            "peopleImpactShow": '0',
            "invesmentCostStatus": "High",
            "isPassed": true
          },
          {
            "title": "<strong>Standardise on a cloud-based managed data platform with embedded machine learning and analytics capabilities.</strong><p>Engage vendors for third-party managed data platforms, along with their accompanying open-sourced services and technologies.</p>",
            "pros": "<p class='txt-title'>- Low startup cost</p><p class='txt-title'>- Increases flexibility</p><p class='txt-title'>- Massively scalable</p>",
            "cons": "<p class='txt-title'>- Requires investment in human capital</p><p class='txt-title'>- Possible vendor lock-in if poorly implemented</p>",
            "cost": 5,
            "productivity": 10,
            "productivityStatus": "High",
            "peopleImpact": 1,
            "peopleImpactShow": '+',
            "invesmentCostStatus": "Low",
            "isPassed": false
          },
          {
            "title": "<strong>Perform an evaluation to standardize on one of your legacy systems and eventually move that system to a cloud provider.</strong><p>Use internal resources to migrate the existing system to IaaS and consolidate data sources to a single platform.</p>",
            "pros": "<p class='txt-title'>- Reuse existing skills and license constructs</p><p class='txt-title'>- Standardise on one system</p>",
            "cons": "<p class='txt-title'>- No net new benefits</p><p class='txt-title'>- Increases risk profile without a proper data governance framework</p>",
            "cost": 5,
            "productivity": 7,
            "productivityStatus": "Low",
            "peopleImpact": 0,
            "peopleImpactShow": '0',
            "invesmentCostStatus": "Low",
            "isPassed": false
          }
        ]
      }
    ],
    "coins": 50,
    "coinsRoot": 50,
    "sumLatest": 0,
    "cultureGrade": 'B',
    "title": "People",
    "introduce": "Eros donec ac odio tempor orci dapibus ultrices in. Amet justo donec enim diam vulputate ut pharetra. At volutpat diam ut venenatis tellus in metus. A arcu cursus vitae congue mauris rhoncus. Enim ut tellus elementum sagittis vitae et leo duis.",
    "groups": [],
    "dataMessages": [
      {
        "min": 0,
        "max": 23,
        "title": "<p class='main-title'>That was a smart decision!</p>"
      },
      {
        "min": 24,
        "max": 37,
        "title": "<p class='secondary-title'>Not the worst, not the best.</p>"
      },
      {
        "min": 38,
        "max": 100,
        "title": "<p class='third-title'>Oh no!</p>"
      },
    ],
    "invesmentCostStatusData": [
      {
        "name": "high",
        "iconClass": "fa fa-angle-double-up green",
        "iconClass2": "fa fa-angle-up green",
        "hasTripleIcon": true,
      }, 
      {
        "name": "medium",
        "iconClass": "fa fa-angle-double-up blue",
        "hasTripleIcon": false,
      }, 
      { 
        "name": "low",
        "iconClass": "fa fa-angle-up yellow",
        "hasTripleIcon": false,
      }
    ],
    "dataRevenueMessage": [
      {
        "impactValue": -2,
        "title": "<span class='txt-red'>Total Loss!</span>",
        "class": "txt-red",
        "iconClass": "fa fa-angle-double-down red",
        "isIcon": true,
      },
      {
        "impactValue": -1,
        "title": "<span class='txt-yellow'>Loss!</span>",
        "class": "txt-yellow",
        "iconClass": "fa fa-angle-down yellow",
        "isIcon": true,
      },
      {
        "impactValue": 0,
        "title": "<span class='txt-grey'>Break even.</span>",
        "class": "txt-grey",
        "iconClass": "fa fa-minus grey",
        "isIcon": true,
      },
      {
        "impactValue": 1,
        "title": "<span class='txt-green'>Good profits!</span>",
        "class": "txt-green",
        "iconClass": "fa fa-angle-up green",
        "isIcon": true,
      },
      {
        "impactValue": 2,
        "title": "<span class='txt-green'>Highly profitable!</span>",
        "class": "txt-green",
        "iconClass": "fa fa-angle-double-up green",
        "isIcon": true,
      },
    ],
  "moraleScores": [
    { "min": -2, "max": 1 },
    { "min": 2, "max": 4 },
    { "min": 5, "max": 7 },
    { "min": 8, "max": 15 },
  ],
  }
}

module.exports = jsonResponse;