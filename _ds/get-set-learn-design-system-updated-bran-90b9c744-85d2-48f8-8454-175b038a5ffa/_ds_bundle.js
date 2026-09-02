/* @ds-bundle: {"format":3,"namespace":"GetSetLearnDesignSystemUpdatedBrandGuidelines_90b9c7","components":[],"sourceHashes":{"ui_kits/portal/MentorMessages.jsx":"e27c702b92f4","ui_kits/portal/NextSession.jsx":"7068708a1c90","ui_kits/portal/ProgressBoard.jsx":"a4650d9879cb","ui_kits/portal/ProjectCard.jsx":"779578a500b9","ui_kits/portal/Sidebar.jsx":"77b75f702403","ui_kits/portal/WelcomeStrip.jsx":"9aec3805418d","ui_kits/website/CTABand.jsx":"98003f50a9b0","ui_kits/website/Footer.jsx":"bb6bf45fbd40","ui_kits/website/Hero.jsx":"a676548d65a4","ui_kits/website/Nav.jsx":"5d44c3f0458c","ui_kits/website/ProgramsGrid.jsx":"dfccd760ec30","ui_kits/website/TestimonialCard.jsx":"507585a93126","ui_kits/website/ValueProps.jsx":"d6f1c7e191b3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GetSetLearnDesignSystemUpdatedBrandGuidelines_90b9c7 = window.GetSetLearnDesignSystemUpdatedBrandGuidelines_90b9c7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/portal/MentorMessages.jsx
try { (() => {
/* MentorMessages.jsx — sticky chat with mentor */
function MentorMessages() {
  const [msgs, setMsgs] = React.useState([{
    who: 'mentor',
    name: 'Rohan',
    text: 'Nice work on the mood detector! For week 3, think about *one* topic your chatbot should be good at. Mine quizzes me on Indian states.'
  }, {
    who: 'you',
    text: 'Mine\'s going to quiz me on Hindi vocab. My mom keeps asking what "ख" means 😅'
  }, {
    who: 'mentor',
    name: 'Rohan',
    text: 'Love it. Bring 10 word→meaning pairs to today\'s session.'
  }]);
  const [draft, setDraft] = React.useState('');
  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, {
      who: 'you',
      text: draft.trim()
    }]);
    setDraft('');
    setTimeout(() => {
      setMsgs(m => [...m, {
        who: 'mentor',
        name: 'Rohan',
        text: '👍 Got it — see you at 4.'
      }]);
    }, 600);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "gslp-card gslp-mentor"
  }, /*#__PURE__*/React.createElement("header", {
    className: "gslp-card__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "Mentor"), /*#__PURE__*/React.createElement("h3", {
    className: "gslp-card__title"
  }, "Rohan \xB7 AI track")), /*#__PURE__*/React.createElement("span", {
    className: "gslp-mentor__online"
  }, "\u25CF Online")), /*#__PURE__*/React.createElement("div", {
    className: "gslp-mentor__log"
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'gslp-msg gslp-msg--' + m.who
  }, m.who === 'mentor' && /*#__PURE__*/React.createElement("div", {
    className: "gslp-msg__avatar",
    style: {
      background: 'var(--gsl-purple)'
    }
  }, "R"), /*#__PURE__*/React.createElement("div", {
    className: "gslp-msg__bubble"
  }, m.text)))), /*#__PURE__*/React.createElement("form", {
    className: "gslp-mentor__composer",
    onSubmit: e => {
      e.preventDefault();
      send();
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "gslp-mentor__input",
    placeholder: "Reply to Rohan\u2026",
    value: draft,
    onChange: e => setDraft(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "gsl-btn gsl-btn--primary",
    type: "submit",
    style: {
      padding: '10px 18px',
      fontSize: 14
    }
  }, "Send")));
}
window.MentorMessages = MentorMessages;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/MentorMessages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/NextSession.jsx
try { (() => {
/* NextSession.jsx — the big poster-style next-session card */
function NextSession() {
  const [joined, setJoined] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "gslp-next"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-next__chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gslp-next__chip-dot"
  }), "Live in 2h 14m"), /*#__PURE__*/React.createElement("div", {
    className: "gslp-overline",
    style: {
      color: 'var(--gsl-turquoise)'
    }
  }, "AI for Young Minds \xB7 Week 3 of 6"), /*#__PURE__*/React.createElement("h2", {
    className: "gslp-next__title"
  }, "Build a chatbot that quizzes you."), /*#__PURE__*/React.createElement("p", {
    className: "gslp-next__sub"
  }, "Today you'll teach your bot 10 quiz questions from your homework and connect it to a \"give me a hint\" button."), /*#__PURE__*/React.createElement("div", {
    className: "gslp-next__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-next__mentor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-next__avatar",
    style: {
      background: 'var(--gsl-purple)'
    }
  }, "R"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Mentor Rohan"), /*#__PURE__*/React.createElement("span", null, "+ 7 other students"))), /*#__PURE__*/React.createElement("div", {
    className: "gslp-next__ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'gsl-btn gsl-btn--accent' + (joined ? ' gslp-next__joined' : ''),
    onClick: () => {
      setJoined(true);
      window.gslToast && window.gslToast("You're in — see you at 4 PM.");
    }
  }, joined ? '✓ You\'re in' : 'Join live session →'), /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--ghost-on-dark",
    href: "#"
  }, "Open prep notes"))));
}
window.NextSession = NextSession;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/NextSession.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/ProgressBoard.jsx
try { (() => {
/* ProgressBoard.jsx — progress ring + weekly checklist for the active track */
function ProgressBoard() {
  const initialWeeks = [{
    n: 1,
    t: 'Hello, AI',
    done: true,
    current: false
  }, {
    n: 2,
    t: 'Patterns &amp; data',
    done: true,
    current: false
  }, {
    n: 3,
    t: 'Build a chatbot',
    done: false,
    current: true
  }, {
    n: 4,
    t: 'Memory &amp; mood',
    done: false,
    current: false
  }, {
    n: 5,
    t: 'Hand-off to humans',
    done: false,
    current: false
  }, {
    n: 6,
    t: 'Demo day',
    done: false,
    current: false
  }];
  const [weeks, setWeeks] = React.useState(initialWeeks);
  const completed = weeks.filter(w => w.done).length;
  const pct = Math.round(completed / weeks.length * 100);
  const toggle = n => setWeeks(w => w.map(x => x.n === n ? {
    ...x,
    done: !x.done
  } : x));
  return /*#__PURE__*/React.createElement("section", {
    className: "gslp-card gslp-progress"
  }, /*#__PURE__*/React.createElement("header", {
    className: "gslp-card__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "Your progress"), /*#__PURE__*/React.createElement("h3", {
    className: "gslp-card__title"
  }, "AI for Young Minds")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gslp-card__more"
  }, "All tracks \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "gslp-progress__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-ring"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "42",
    stroke: "var(--gsl-neutral-200)",
    strokeWidth: "10",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "42",
    stroke: "var(--gsl-turquoise)",
    strokeWidth: "10",
    fill: "none",
    strokeDasharray: `${pct / 100 * 264} 264`,
    strokeLinecap: "round",
    transform: "rotate(-90 50 50)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gslp-ring__inner"
  }, /*#__PURE__*/React.createElement("strong", null, pct, "%"), /*#__PURE__*/React.createElement("span", null, completed, "/", weeks.length, " weeks"))), /*#__PURE__*/React.createElement("ul", {
    className: "gslp-weeks"
  }, weeks.map(w => /*#__PURE__*/React.createElement("li", {
    key: w.n,
    className: 'gslp-week' + (w.done ? ' is-done' : '') + (w.current ? ' is-current' : '')
  }, /*#__PURE__*/React.createElement("button", {
    className: "gslp-week__check",
    onClick: () => toggle(w.n),
    "aria-label": w.done ? 'Mark incomplete' : 'Mark complete'
  }, w.done ? '✓' : w.current ? '●' : ''), /*#__PURE__*/React.createElement("span", {
    className: "gslp-week__num"
  }, "Week ", w.n), /*#__PURE__*/React.createElement("span", {
    className: "gslp-week__title",
    dangerouslySetInnerHTML: {
      __html: w.t
    }
  }), w.current ? /*#__PURE__*/React.createElement("span", {
    className: "gslp-week__chip"
  }, "Live today") : null)))));
}
window.ProgressBoard = ProgressBoard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/ProgressBoard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/ProjectCard.jsx
try { (() => {
/* ProjectCard.jsx — recent project grid */
function ProjectsStrip() {
  const projects = [{
    id: 1,
    t: 'Story-mood detector',
    track: 'AI · Week 2',
    status: 'submitted',
    color: 'azure'
  }, {
    id: 2,
    t: 'Pattern-spotting flashcards',
    track: 'AI · Week 1',
    status: 'submitted',
    color: 'azure'
  }, {
    id: 3,
    t: 'My first robot race',
    track: 'Robo Maker · Week 4',
    status: 'in-progress',
    color: 'orange'
  }, {
    id: 4,
    t: 'Coin-counting machine',
    track: 'Robo Maker · Week 3',
    status: 'submitted',
    color: 'orange'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gslp-card"
  }, /*#__PURE__*/React.createElement("header", {
    className: "gslp-card__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "Recent projects"), /*#__PURE__*/React.createElement("h3", {
    className: "gslp-card__title"
  }, "What you've built")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gslp-card__more"
  }, "See all \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "gslp-projects"
  }, projects.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.id,
    className: 'gslp-project gslp-project--' + p.color
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-project__thumb",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-project__dots"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
    className: "gslp-project__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, p.track), /*#__PURE__*/React.createElement("h4", null, p.t), /*#__PURE__*/React.createElement("div", {
    className: 'gslp-status gslp-status--' + p.status
  }, p.status === 'submitted' ? '✓ Submitted' : '◐ In progress'))))));
}
window.ProjectsStrip = ProjectsStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Sidebar.jsx
try { (() => {
/* Sidebar.jsx — vertical sidebar for the portal */
function Sidebar({
  active,
  onSelect
}) {
  const items = [{
    id: 'home',
    label: 'Home',
    icon: '⌂'
  }, {
    id: 'cohort',
    label: 'My cohort',
    icon: '◎'
  }, {
    id: 'projects',
    label: 'Projects',
    icon: '□'
  }, {
    id: 'badges',
    label: 'Badges',
    icon: '★'
  }, {
    id: 'schedule',
    label: 'Schedule',
    icon: '▤'
  }, {
    id: 'messages',
    label: 'Messages',
    icon: '✉',
    badge: 2
  }];
  const tracks = [{
    id: 'ai',
    name: 'AI for Young Minds',
    color: 'azure',
    active: true
  }, {
    id: 'st',
    name: 'Robo Maker Lab',
    color: 'orange'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "gslp-sb"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gslp-sb__logo",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/gsl-logo-01.svg",
    alt: "Get Set Learn"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "gslp-sb__nav"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    className: 'gslp-sb__item' + (active === it.id ? ' is-active' : ''),
    onClick: e => {
      e.preventDefault();
      onSelect(it.id);
    },
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gslp-sb__icon",
    "aria-hidden": "true"
  }, it.icon), /*#__PURE__*/React.createElement("span", null, it.label), it.badge ? /*#__PURE__*/React.createElement("span", {
    className: "gslp-sb__badge"
  }, it.badge) : null))), /*#__PURE__*/React.createElement("div", {
    className: "gslp-sb__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "My tracks"), tracks.map(t => /*#__PURE__*/React.createElement("a", {
    key: t.id,
    href: "#",
    className: 'gslp-track gslp-track--' + t.color + (t.active ? ' is-active' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "gslp-track__dot"
  }), t.name))), /*#__PURE__*/React.createElement("div", {
    className: "gslp-sb__user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-sb__avatar",
    style: {
      background: 'var(--gsl-orange)'
    }
  }, "A"), /*#__PURE__*/React.createElement("div", {
    className: "gslp-sb__userinfo"
  }, /*#__PURE__*/React.createElement("strong", null, "Aanya S."), /*#__PURE__*/React.createElement("span", null, "Age 11 \xB7 Mumbai")), /*#__PURE__*/React.createElement("button", {
    className: "gslp-sb__signout",
    title: "Sign out"
  }, "\u21F2")));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/WelcomeStrip.jsx
try { (() => {
/* WelcomeStrip.jsx — greeting, streak, XP bar */
function WelcomeStrip() {
  return /*#__PURE__*/React.createElement("div", {
    className: "gslp-welcome"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline",
    style: {
      color: 'var(--gsl-turquoise-700)'
    }
  }, "Saturday, Aug 16"), /*#__PURE__*/React.createElement("h1", {
    className: "gslp-welcome__title"
  }, "Hi Aanya \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "gslp-welcome__accent"
  }, "your robot's waiting.")), /*#__PURE__*/React.createElement("p", {
    className: "gslp-welcome__sub"
  }, "You're 3 sessions into AI for Young Minds and 1 away from your \"First Build\" badge.")), /*#__PURE__*/React.createElement("div", {
    className: "gslp-welcome__stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gslp-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gslp-stat__num"
  }, "7 ", /*#__PURE__*/React.createElement("span", {
    className: "gslp-stat__icon"
  }, "\u26A1")), /*#__PURE__*/React.createElement("span", {
    className: "gslp-stat__label"
  }, "Day streak")), /*#__PURE__*/React.createElement("div", {
    className: "gslp-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gslp-stat__num"
  }, "1,240"), /*#__PURE__*/React.createElement("span", {
    className: "gslp-stat__label"
  }, "XP this month"))));
}
window.WelcomeStrip = WelcomeStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/WelcomeStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CTABand.jsx
try { (() => {
/* CTABand.jsx — full-bleed conversion band */
function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    className: "gsl-ctaband"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-ctaband__decor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsl-ctaband__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gsl-ctaband__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gsl-ctaband__dot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gsl-ctaband__inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gsl-ctaband__title"
  }, "Try a free 90-minute session."), /*#__PURE__*/React.createElement("p", {
    className: "gsl-ctaband__sub"
  }, "No card on file. No homework. Just a real cohort, with mentors, on a Saturday."), /*#__PURE__*/React.createElement("div", {
    className: "gsl-ctaband__ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--accent",
    href: "#"
  }, "Pick a track \u2192"), /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--ghost-on-dark",
    href: "#"
  }, "For schools"))));
}
window.CTABand = CTABand;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CTABand.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Footer.jsx — site footer */
function Footer() {
  const cols = [{
    title: 'Programs',
    items: ['AI for Young Minds', 'Robo Maker Lab', 'Future CEO', 'Life Skills Studio']
  }, {
    title: 'Company',
    items: ['About', 'Mentors', 'Press', 'Careers']
  }, {
    title: 'Schools',
    items: ['Partner with us', 'NEP framework', 'Educator resources', 'Book a demo']
  }, {
    title: 'Support',
    items: ['FAQ', 'Help center', 'Contact', 'Refund policy']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "gsl-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/gsl-logo-white.svg",
    alt: "Get Set Learn",
    className: "gsl-footer__logo"
  }), /*#__PURE__*/React.createElement("p", {
    className: "gsl-footer__tagline"
  }, "Hands-on future-skills programs for K\u201312 in India."), /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Instagram"
  }, "IG"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "LinkedIn"
  }, "in"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "YouTube"
  }, "\u25B7"))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__cols"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__col",
    key: c.title
  }, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("ul", null, c.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, i)))))))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-footer__legal"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Get Set Learn 2026"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Terms")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/amg-gsl-logo-white.svg",
    alt: "An Arvind Mafatlal Group Company",
    className: "gsl-footer__amg"
  })));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero.jsx — top of homepage. Big headline, sub, two CTAs, and a poster card
   with the pop-shadow signature on the right. */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "gsl-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-hero__copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline",
    style: {
      color: 'var(--gsl-turquoise-700)'
    }
  }, "Future-skills cohorts \xB7 K\u201312"), /*#__PURE__*/React.createElement("h1", {
    className: "gsl-hero__title"
  }, "Skill-first learning,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "gsl-hero__title-accent"
  }, "from age 6.")), /*#__PURE__*/React.createElement("p", {
    className: "gsl-hero__sub"
  }, "Hands-on programs in AI, robotics, entrepreneurship, and life skills \u2014 built for the way kids actually learn."), /*#__PURE__*/React.createElement("div", {
    className: "gsl-hero__ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--pop",
    href: "#"
  }, "Start a free trial \u2192"), /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--ghost",
    href: "#"
  }, "See programs")), /*#__PURE__*/React.createElement("div", {
    className: "gsl-hero__meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-hero__meta-row"
  }, /*#__PURE__*/React.createElement("strong", null, "4"), " future-skill tracks", /*#__PURE__*/React.createElement("span", {
    className: "gsl-dot"
  }), /*#__PURE__*/React.createElement("strong", null, "12-wk"), " cohorts", /*#__PURE__*/React.createElement("span", {
    className: "gsl-dot"
  }), /*#__PURE__*/React.createElement("strong", null, "NEP-aligned"), " curriculum"))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-hero__art"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsl-poster__chip-dot"
  }), "Live cohort \xB7 12 seats left"), /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__photo",
    role: "img",
    "aria-label": "Photo: students huddled around a robot they built"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gsl-poster__photo-label"
  }, "photo \xB7 4:5 \xB7 students with their robot")), /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "AI \xB7 Ages 9-12"), /*#__PURE__*/React.createElement("h3", {
    className: "gsl-poster__title"
  }, "AI for Young Minds")), /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__price"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__price-num"
  }, "\u20B94,499"), /*#__PURE__*/React.createElement("div", {
    className: "gsl-poster__price-sub"
  }, "6 weekends")))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-blob gsl-blob--turq",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gsl-blob gsl-blob--orange",
    "aria-hidden": "true"
  })));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* Nav.jsx — sticky top navigation */
function Nav() {
  const [active, setActive] = React.useState('programs');
  const links = [{
    id: 'programs',
    label: 'Programs'
  }, {
    id: 'how',
    label: 'How it works'
  }, {
    id: 'schools',
    label: 'For schools'
  }, {
    id: 'about',
    label: 'About'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "gsl-nav"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gsl-nav__logo",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/gsl-logo-01.svg",
    alt: "Get Set Learn"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gsl-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    className: 'gsl-nav__link' + (active === l.id ? ' is-active' : ''),
    onClick: e => {
      e.preventDefault();
      setActive(l.id);
    },
    href: "#"
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-nav__spacer"
  }), /*#__PURE__*/React.createElement("a", {
    className: "gsl-nav__signin",
    href: "#"
  }, "Sign in"), /*#__PURE__*/React.createElement("a", {
    className: "gsl-btn gsl-btn--primary",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.gslToast && window.gslToast('We\'ll be in touch — demo coming up.');
    }
  }, "Book a demo ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProgramsGrid.jsx
try { (() => {
/* ProgramsGrid.jsx — 4 cards, one per future-skills track. */
const PROGRAMS = [{
  id: 'ai',
  track: 'AI',
  age: '9-12',
  color: 'azure',
  title: 'AI for Young Minds',
  sub: 'Build your first chatbot in 6 weekends, with a mentor.',
  weeks: 6,
  price: '₹4,499',
  day: 'Sat 10am'
}, {
  id: 'steam',
  track: 'STEAM & Robotics',
  age: '6-8',
  color: 'orange',
  title: 'Robo Maker Lab',
  sub: 'Snap, code, and race your first robot.',
  weeks: 8,
  price: '₹5,299',
  day: 'Sun 11am'
}, {
  id: 'entre',
  track: 'Entrepreneurship',
  age: '13-16',
  color: 'purple',
  title: 'Future CEO',
  sub: 'Pitch a real business in 10 weeks.',
  weeks: 10,
  price: '₹6,499',
  day: 'Sat 4pm'
}, {
  id: 'life',
  track: 'Life Skills',
  age: '9-12',
  color: 'pink',
  title: 'Life Skills Studio',
  sub: 'Money, mindset, and how to handle the hard stuff.',
  weeks: 6,
  price: '₹3,999',
  day: 'Sun 5pm'
}];
function ProgramCard({
  p
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: 'gsl-program gsl-program--' + p.color
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-program__swatch",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-program__dots"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline gsl-program__track"
  }, p.track, " \xB7 Ages ", p.age), /*#__PURE__*/React.createElement("h3", {
    className: "gsl-program__title"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "gsl-program__sub"
  }, p.sub), /*#__PURE__*/React.createElement("div", {
    className: "gsl-program__meta"
  }, /*#__PURE__*/React.createElement("span", null, p.weeks, " weeks"), /*#__PURE__*/React.createElement("span", {
    className: "gsl-dot"
  }), /*#__PURE__*/React.createElement("span", null, p.day), /*#__PURE__*/React.createElement("span", {
    className: "gsl-dot"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, p.price))), /*#__PURE__*/React.createElement("a", {
    className: "gsl-program__cta",
    href: "#"
  }, "See cohort \u2192"));
}
function ProgramsGrid() {
  return /*#__PURE__*/React.createElement("section", {
    className: "gsl-section",
    id: "programs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-section__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "Programs"), /*#__PURE__*/React.createElement("h2", {
    className: "gsl-section__title"
  }, "Four tracks. Every age."), /*#__PURE__*/React.createElement("p", {
    className: "gsl-section__sub"
  }, "Each program runs as a small, mentor-led cohort with weekly hands-on projects. Switch tracks any time before week 2.")), /*#__PURE__*/React.createElement("div", {
    className: "gsl-programs"
  }, PROGRAMS.map(p => /*#__PURE__*/React.createElement(ProgramCard, {
    key: p.id,
    p: p
  }))));
}
window.ProgramsGrid = ProgramsGrid;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProgramsGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TestimonialCard.jsx
try { (() => {
/* TestimonialCard.jsx — quote with attribution */
function TestimonialStrip() {
  const items = [{
    q: 'My daughter built a chatbot that quizzes her on Hindi vocab — she actually *uses* it. I haven\'t seen her this excited about a course before.',
    who: 'Priya R., parent · Mumbai',
    role: 'AI for Young Minds',
    color: 'azure'
  }, {
    q: 'The pitch night at the end was wild. Twelve 14-year-olds explaining unit economics to their parents.',
    who: 'Mr. Khanna · Head of School',
    role: 'Future CEO',
    color: 'purple'
  }, {
    q: 'I taught my little brother how to wire an LED. Mom is now nervous around the toaster.',
    who: 'Arjun, age 11',
    role: 'Robo Maker Lab',
    color: 'orange'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gsl-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-section__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-overline"
  }, "Why parents trust us"), /*#__PURE__*/React.createElement("h2", {
    className: "gsl-section__title"
  }, "Real cohorts. Real receipts.")), /*#__PURE__*/React.createElement("div", {
    className: "gsl-testimonials"
  }, items.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: 'gsl-testimonial gsl-testimonial--' + t.color,
    key: i
  }, /*#__PURE__*/React.createElement("blockquote", null, t.q), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("strong", null, t.who), /*#__PURE__*/React.createElement("span", null, t.role))))));
}
window.TestimonialStrip = TestimonialStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ValueProps.jsx
try { (() => {
/* ValueProps.jsx — three-up explanatory strip */
function ValueProps() {
  const items = [{
    i: '01',
    t: 'Skill-first, not marks-first',
    d: 'Every cohort ships a project — a working chatbot, a built robot, a pitch deck. The portfolio is the proof.'
  }, {
    i: '02',
    t: 'Mentor-led, small cohorts',
    d: 'Max 8 students per live session. Mentors are practitioners, not just teachers.'
  }, {
    i: '03',
    t: 'NEP-aligned curriculum',
    d: 'Designed against the National Education Policy 2020 framework for 21st-century skills.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gsl-section gsl-section--tinted"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-valueprops"
  }, items.map(v => /*#__PURE__*/React.createElement("div", {
    className: "gsl-valueprop",
    key: v.i
  }, /*#__PURE__*/React.createElement("div", {
    className: "gsl-valueprop__num"
  }, v.i), /*#__PURE__*/React.createElement("h3", {
    className: "gsl-valueprop__title"
  }, v.t), /*#__PURE__*/React.createElement("p", {
    className: "gsl-valueprop__desc"
  }, v.d)))));
}
window.ValueProps = ValueProps;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ValueProps.jsx", error: String((e && e.message) || e) }); }

})();
