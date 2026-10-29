---
title: DoK Contributor Program
label: Program guide 2027
lead: How the Data on Kubernetes Community is organized, how contributions are recognized, and how to take part.
date: '2026-10-08T00:00:00Z'
sections:
- type: text
  label: About the community
  title: The vendor-neutral home for people who run data on Kubernetes
  content: |
    Founded in 2020, the Data on Kubernetes Community (DoK) brings together platform engineers, SREs, DBAs, data and ML infrastructure teams and operator maintainers to share how they run databases, streaming, analytics and AI data on Kubernetes in production.

    4,300+ Slack members, 600+ talks and videos, two DoK Days a year at KubeCon EU and NA, and the annual [Data on Kubernetes report](/dok-reports/).
  buttons:
  - label: Join the Slack
    url: "@slack"
  - label: Become a Pilot
    url: /pilots/

- type: bento
  label: Mission
  title: Help every team run data on Kubernetes in production without guessing.
  intro: We do it through four areas of work.
  frame: "namespace: dok-mission"
  items:
  - style: teal
    size: large
    label: Area 01
    title: Day-2 for data
    text: Upgrades, backup and restore, failover, operators in production.
  - style: paper
    label: Area 02
    title: Storage that keeps up
    text: I/O, CSI, local and network storage, cost.
  - style: sun
    label: Area 03
    title: Data for AI
    text: Vector stores, feature stores, lakehouses on Kubernetes.
  - style: violet
    size: wide
    label: Area 04
    title: People and skills
    text: Learning paths, DBA to platform, mentoring.

- type: bento
  label: Ways to participate
  title: Participation starts at 15 minutes
  frame: "kind: Contribution"
  items:
  - style: teal
    label: 01 · 15 min
    title: Help
    text: "Answer in #help."
  - style: panel
    label: 02 · 1 to 2 hrs
    title: Share
    text: "Post a #friday-fail."
  - style: panel
    label: 03 · 2 to 4 hrs
    title: Review
    text: Test a pattern.
  - style: panel
    label: 04 · 1 to 3 days
    title: Create
    text: Write a pattern.
  - style: panel
    label: 05 · Monthly
    title: Host
    text: Run a Dock.
  - style: violet
    label: 06 · Weekly
    title: Lead
    text: Pilot or SIG lead.
    button:
      label: Become a Pilot
      url: /pilots/

- type: text
  tone: panel
  label: Getting started
  title: The path to a first credited contribution
  content: |
    1. **Join** the [DoK Slack](@slack).
    2. **Pick** a task from the good-first-contribution board.
    3. **Pair** with a buddy, who replies within 48 hours.
    4. **Ship** it using the templates in the [dokc GitHub org](@github).
    5. **Credit:** your name is on the work within a week.

    Target: a first credited contribution within 14 days. Bring questions to the monthly New Contributor Hour on DoK Live.

- type: text
  width: wide
  label: What counts
  title: Code is one contribution among many
  content: |
    | Area | Examples |
    | --- | --- |
    | Patterns and docs | Write, edit or maintain DoK Patterns and guides |
    | Talks and content | DoK Day, DoK Live, podcasts, blog posts, Postmortem Club |
    | Reviews and testing | Review patterns, test them on real clusters |
    | Research | State of DoK report, Operator Scorecard |
    | Community and events | Run a Dock, moderate Slack, organize meetups |
    | Translation and design | Translate patterns, create talk art, templates |
    | Infrastructure and web | Website, GitHub tooling, streaming setup |
    | Advocacy | Press, social, representing DoK at conferences |

- type: split
  content: |
    ## DoK Pilots

    Ambassadors who represent DoK and help new contributors.

    - 30 Pilots in 2027: 15 in March, 15 in September
    - 4 hours a month, one contribution per quarter
    - Eligible after 2 contributions at review level or above
    - Vendor staff capped at 40% of each cohort

    [Apply to be a Pilot](/pilots/)
  content2: |
    ## Docks

    City chapters that run local meetups.

    - 10 launch cities: Berlin, London, Amsterdam, Barcelona, Bangalore, New York, SF Bay Area, Austin, São Paulo, Tokyo
    - Two organizers each, quarterly meetups
    - Meetup-in-a-box kit and funding support

    [Start a Dock](@dockApply) · [Organizer handbook](/meetup-organizers/)

- type: text
  width: wide
  label: Recognized contributors
  title: Five levels of recognition
  content: |
    | Level | Who |
    | --- | --- |
    | Core Team | Runs the community and its infrastructure |
    | Major Contributors | Sustained, significant work over a year or more: SIG leads, Pilots, lead pattern authors |
    | Significant Contributors | Repeated contributions: several patterns, talks, reviews or events |
    | Contributors | Anyone with a credited contribution: a review, a talk, a translation, a fix |
    | Emeritus | Past Major Contributors, listed for their lasting work |

    Every recognized contributor is listed publicly on the [contributors page](/contributors/), grouped by level, in alphabetical order. Contributors update their own profile.

- type: text
  tone: panel
  label: How recognition works
  title: A Contributors Committee reviews nominations twice a year
  content: |
    1. **Nominate.** Anyone can nominate, including themselves.
    2. **Review.** The committee checks the public record.
    3. **Decide.** A level is assigned, with a short reason.
    4. **List.** The profile is published on the site.
    5. **Revisit.** Levels are reviewed yearly; Emeritus on request.

    Reviews run in February and August. Results are announced at DoK Day EU and NA.
  buttons:
  - label: Nominate a contributor
    url: "@nominate"
  - label: See contributors
    url: /contributors/

- type: text
  width: wide
  label: Benefits
  title: What each level receives
  content: |
    | Benefit | Contributor | Significant | Major | Core |
    | --- | :-: | :-: | :-: | :-: |
    | Public profile and credits on your work | ● | ● | ● | ● |
    | Slack badge and newsletter shout-outs | ● | ● | ● | ● |
    | Contributor pin | | ● | ● | ● |
    | Priority review for DoK Day talk proposals | | ● | ● | ● |
    | DoK Day ticket from the sponsor pool | | | ● | ● |
    | Travel grant eligibility | | | ● | ● |
    | Can stand for end-user steering seats | | | ● | ● |
    | Reference letter from the steering committee | | | ● | ● |

    Travel grants and tickets depend on budget and sponsor support each year.

- type: text
  width: wide
  label: Structure
  title: How DoK is organized
  content: |
    | Body | Role |
    | --- | --- |
    | Steering Committee | 5 seats: 2 end users, 2 sponsors, 1 maintainer |
    | Sponsor Council | Advises, no vote |
    | Core Team | Runs the community |
    | SIGs and WGs | Operator, Storage, Data for AI, Security, Report |
    | Pilots and Docks | 30 ambassadors, 10 city chapters |
    | Program committees | Select DoK Day talks, half end users |

- type: people
  label: Core team
  title: The core team runs DoK day to day
  intro: Three seats are open. Interested? Write to [dok@solanica.io](@core).
  people:
  - name: Kate Obiidykhata
    role: Community Cosmonaut
    image: images/people/kate-obiidykhata.jpg
    links:
      linkedin: https://www.linkedin.com/in/kate-obiidykhata-692a79ba
  - name: Sergey Pronin
    role: Community Cosmonaut
    image: images/people/sergey-pronin.jpg
    links:
      linkedin: https://www.linkedin.com/in/sergeypronin/
  - name: Open seat
    role: Community and Events Lead
  - name: Open seat
    role: Content and Editorial Lead
  - name: Open seat
    role: Technical Programs Lead (SIGs, Patterns, Scorecard)

- type: text
  tone: panel
  label: Our commitments
  title: What contributors can expect from DoK
  content: |
    - **Credit within a week.** By name, in public.
    - **A reply in 48 hours.** For every first contributor.
    - **Your work stays yours.** CC BY 4.0, you as author.
    - **Neutral by design.** No sponsor logos in patterns, Scorecard or report.
    - **All work counts.** Non-code contributions count as much as code.
    - **Code of conduct.** The [CNCF code of conduct](@codeOfConduct), with a named contact.

- type: split
  card: true
  content: |
    ## Where to find us

    - **Slack:** #contribute in the [DoK Slack](@slack)
    - **GitHub:** [github.com/dokc](@github)
    - **Recognition:** [dok@solanica.io](mailto:dok@solanica.io)
    - **Core team:** [dok@solanica.io](@core)
---
