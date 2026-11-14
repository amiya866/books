const chapters = [
  {id:1,title:"大债务周期概述",part:"第一部分 · 大债务周期概述",short:"从支付承诺理解国家信用",original:"国家「破产」通常不是资产被清算，而是偿债承诺以违约、通胀或贬值的方式被重定。",intro:"开篇先把国家与家庭分开。家庭不能用本币还债，国家却可能拥有征税与货币发行能力。因此真正要观察的不是债务总额是否惊人，而是偿债承诺、收入、资产、融资需求和货币信用能否长期匹配。",keys:["支付承诺","大债务周期","货币信用"],questions:[
    {q:"国家破产和公司破产是一回事吗？",a:"公司破产通常进入清算或重组，国家却可能通过征税、展期、重组、通胀和货币贬值延续运行。拥有本币发行权的国家即使不形式违约，也可能让债权人实际购买力缩水。阅读时要区分名义偿付与实际偿付。",ask:"我讨论的是债务违约，还是货币购买力损失？"},
    {q:"为什么大债务周期容易被一代人忽视？",a:"长周期横跨的时间接近一生，多数人只能亲身经历其中一段。繁荣期的经验会被当成常态，直到利率、债券需求和汇率同时变化，旧经验才失效。历史案例的价值，就是补足个人生命经验的样本不足。",ask:"我判断是否把最近十年的经验当成了永恒规律？"},
    {q:"债务增长本身就一定是坏事吗？",a:"不是。若债务支持的生产性投资带来的收入增长高于偿债成本，债务可以推动发展；若新增债务主要维持消费、填补旧债利息或推高资产价格，脆弱性才会积累。关键不是有没有债，而是债务形成了什么现金流。",ask:"这笔债务最终会增加收入，还是只增加下一次融资需求？"}]},
  {id:2,title:"用文字和概念阐释其机制",part:"第一部分 · 大债务周期概述",short:"信贷如何把未来拉到今天",original:"信贷让今天的支出超过今天的收入，也把未来的收入提前抵押。",intro:"这一章适合抓住一条链：信贷扩张提高支出，支出形成他人的收入，收入又支持更多借贷；当偿债支出开始挤压消费和投资，链条便可能反向运行。债券市场不是被动记账，而是资金供给与政府融资需求不断相遇的地方。",keys:["信贷","偿债支出","债券供需"],questions:[
    {q:"为什么信贷扩张既能促进增长，也能埋下危机？",a:"借款把未来购买力提前使用，短期会增加消费、投资和收入。如果新增产出足以偿还本息，正反馈可以延续；如果收入没有同步增长，偿债就会侵蚀未来支出。同一笔信贷，在周期早期是动力，在后期可能成为约束。",ask:"我看到的增长来自真实收入，还是来自负债提前释放的购买力？"},
    {q:"政府债券利率为什么不只由央行决定？",a:"央行能直接影响短端政策利率，但长期国债还取决于通胀预期、期限溢价、财政供给和投资者配置意愿。若新债供给超过市场愿意承接的规模，收益率就需要上升才能吸引买家。央行可以干预，却也要承担扩表与货币信用的代价。",ask:"当前利率变化来自政策预期，还是买家要求更高补偿？"},
    {q:"本币债和外币债的风险为何不同？",a:"本币债可以通过货币创造偿付，因此更常表现为通胀或贬值风险；外币债无法靠发行本币解决，外汇储备和融资通道一旦不足，更可能出现直接违约。判断一个国家时，先看债务用什么货币计价，再谈债务率高低。",ask:"我是否把本币债务与外币债务用了同一把尺子？"}]},
  {id:3,title:"用数字和方程阐释其机制",part:"第一部分 · 大债务周期概述",short:"用债务率动态代替直觉",original:"债务率的变化，取决于利息、增长、初级财政余额与债务货币化如何共同作用。",intro:"不必害怕公式。债务与GDP之比是一个比率，分子可以因新增赤字和利息上升，分母也会随名义GDP增长。把利率、增长和初级财政收支放在一起，才能理解为什么同样的赤字，在不同环境下会产生完全不同的结果。",keys:["债务率","利率与增长","初级余额"],questions:[
    {q:"为什么只看债务占GDP比例还不够？",a:"债务率是存量与经济规模之比，不直接说明每年的融资压力。期限结构、平均票息、通胀、税收能力和海外持有人结构都会改变风险。两个债务率相同的国家，可能因偿债成本和债务币种不同而处在完全不同的位置。",ask:"我是否同时看了存量、流量、期限与币种？"},
    {q:"利率高于经济增长率就意味着必然失控吗？",a:"利率高于增长会提高维持债务率所需的财政调整幅度，但不是单独的命运判决。初级盈余、存量债务平均成本、通胀和名义增长都能改变结果。真正危险的是高利率、低增长与持续初级赤字长期叠加。",ask:"我是在看单个变量，还是看变量之间能否相互抵消？"},
    {q:"名义增长为什么会影响债务可持续性？",a:"实际增长和通胀共同构成名义GDP。通胀会提高名义税收，也会降低既有固定利率债务的实际负担，但同时可能推高未来发债利率。它能够短期改善比率，却不是无成本工具，因为债权人会要求新的补偿。",ask:"债务率改善来自真实产出，还是通胀带来的名义扩张？"}]},
  {id:4,title:"典型演进路径",part:"第二部分 · 破产的典型演进路径",short:"九个阶段是一张风险地图",original:"九个阶段是一张风险地图，不是可以机械套用的倒计时。",intro:"从私人部门负债，到政府救助，再到国债抛售、央行扩表、债务重组与新均衡，作者把危机拆成可观察的阶段。使用这张地图时，要允许阶段跳跃、反复和不同国家之间的制度差异，不要把模型变成预言日期。",keys:["九阶段","红色警报","路径依赖"],questions:[
    {q:"九阶段模型最有价值的用途是什么？",a:"它把抽象的危机拆成一组可以跟踪的现象，例如债券净抛售、长端利率上升、货币走弱和央行损失。价值在于提醒观察者校准风险，而不是证明所有国家都会按同一顺序走到终点。",ask:"我在用模型寻找证据，还是只挑选支持既定结论的信号？"},
    {q:"为什么危机往往从私人部门传导到政府？",a:"金融系统和大型企业出问题时，政府常用担保、救助、减税和增加支出阻止衰退，私人损失由此部分公共化。短期稳定得以维持，但政府赤字和发债需求上升，风险从银行与企业资产负债表转移到主权信用。",ask:"一次救助消除了损失，还是改变了损失的承担者？"},
    {q:"哪些信号比债务总额更值得警惕？",a:"债务出现持续净抛售、长端利率升得比短端快、货币同时走弱、外汇储备下降，通常比单纯的债务总额更接近市场失序。若央行随后被迫扩大购买，说明私人需求与债券供给之间的缺口已经需要政策填补。",ask:"我是否把价格与数量的共同变化放在了总量之前？"}]},
  {id:5,title:"私人部门与中央政府债务危机（第1~4阶段）",part:"第二部分 · 破产的典型演进路径",short:"风险如何转移到政府账本",original:"私人部门的危机被救助后，损失往往转移到政府资产负债表。",intro:"前四阶段的关键不是某一家机构倒下，而是救助成本如何变成公共债务，以及市场是否仍愿意以原有利率承接这些债务。债券、利率、汇率和储备需要放在一起读，单看股市反弹很容易误判。",keys:["私人债务","政府救助","债券抛售"],questions:[
    {q:"为什么救助私人部门会削弱中央政府？",a:"救助可以阻止金融链式反应，却需要真金白银或新增担保。政府收入若未同步增加，就只能扩大赤字和发债。当市场开始怀疑未来的税收与货币价值，救助带来的稳定便可能转化为新的主权融资压力。",ask:"这项救助的财政成本最终由谁承担？"},
    {q:"国债被抛售为什么会影响整个经济？",a:"国债收益率是许多贷款和资产定价的基准。抛售推高收益率，会抬高政府、企业和家庭的融资成本，同时压低既有债券价值。金融机构账面损失与信贷收缩可能相互强化，最终从债券市场传到实体经济。",ask:"我是否只看到债券价格下跌，却忽略了融资链条？"},
    {q:"利率上升和货币走弱同时出现说明什么？",a:"加息或收益率上升本可能吸引资金，但若货币仍然走弱，往往说明投资者要求的风险补偿上升，甚至在撤离相关资产。它比单一利率上升更值得警惕，因为反映了债务资产与货币信用同时承压。",ask:"市场是在补偿合理回报，还是在要求更高的风险溢价？"}]},
  {id:6,title:"危机蔓延至中央银行（第5~6阶段）",part:"第二部分 · 破产的典型演进路径",short:"印钞能力并不等于无成本",original:"中央银行可以创造货币，却不能保证货币始终拥有相同购买力。",intro:"当短端利率难以下降，央行可能购买国债和其他资产以压低融资成本。若利率随后持续上升，央行所持资产估值下跌，负债成本却可能上升。这里要区分会计损失、负资本与真正的货币信用危机。",keys:["量化宽松","央行损失","死亡螺旋"],questions:[
    {q:"央行购买国债为什么能暂时缓解危机？",a:"央行新增准备金并买入债券，可以补充市场需求、压低收益率并稳定金融机构资产负债表。它赢得了时间，却没有自动修复财政收入与支出的缺口。如果基本面不调整，购买规模可能越来越大。",ask:"这项操作是在为改革争取时间，还是在替代改革？"},
    {q:"央行亏损是否等于央行立即破产？",a:"不等于。央行与商业银行的会计约束不同，负资本也不必然妨碍短期支付。真正需要警惕的是损失与负现金流迫使央行继续创造货币，进而削弱货币信用，形成利率、汇率和扩表相互强化的循环。",ask:"我讨论的是账面损失，还是政策能力开始被货币信用约束？"},
    {q:"所谓死亡螺旋需要哪些条件相互强化？",a:"债务抛售推高利率，利率上升扩大央行损失和财政成本，央行被迫增加购买，货币贬值又促使持有人继续卖出。单有高债务或单次扩表并不足以构成螺旋，关键是这些环节是否形成自我强化。",ask:"我能否指出循环中的每一环，而不是只使用这个惊悚名词？"}]},
  {id:7,title:"上一场大债务危机消退，新均衡达成，新周期开启（第7~9阶段）",part:"第二部分 · 破产的典型演进路径",short:"去杠杆之后如何重建信用",original:"危机的终点不是债务消失，而是债务、收入与货币信用重新达到可持续的均衡。",intro:"后三阶段涉及债务重组、贬值、特别税收、资本管制和信用重建。所谓和谐去杠杆，是在通缩性措施与通胀性措施之间取得平衡，避免经济被债务清偿拖垮，也避免货币价值失控。",keys:["债务重组","和谐去杠杆","新均衡"],questions:[
    {q:"和谐去杠杆为什么需要两类政策配合？",a:"削减债务、重组和节支偏向通缩，货币创造与贬值偏向通胀。只靠前一类可能令收入和资产价格过度收缩，只靠后一类可能损害货币信用。配合的目的，是让债务负担下降时经济仍有基本需求。",ask:"当前政策组合是在平衡两种风险，还是只照顾其中一端？"},
    {q:"资本管制和特别征税为什么会出现？",a:"当政府融资紧张而资本又想离开，政策制定者会限制资金流动并寻找非常规收入。这些措施可以短期保住税基和储备，却也会改变投资者对产权、自由流动和未来回报的预期，因此成本不只在当期。",ask:"短期稳定换来的长期制度成本是什么？"},
    {q:"新周期开始时为什么要重新奖励债权人？",a:"危机后的货币和债券曾被抛售，要重新吸引储蓄，就必须提供更可信的回报和规则，有时意味着较高实际利率与更严格纪律。信用不是宣布出来的，而是在持有人愿意再次承担风险时恢复。",ask:"新安排凭什么让曾经受损的债权人再次信任？"}]},
  {id:8,title:"整体大周期",part:"第二部分 · 破产的典型演进路径",short:"五股力量如何相互放大",original:"债务、政治、地缘、自然与技术相互放大，构成整体大周期。",intro:"大债务周期只是整体大周期的一部分。财政困境会加剧分配冲突，内部冲突影响对外政策，战争与疫情又反过来扩大赤字，技术则同时改变生产率和就业分配。阅读这一章要抵抗单因解释的诱惑。",keys:["五大力量","内部秩序","外部秩序"],questions:[
    {q:"为什么债务问题会演变成政治问题？",a:"调整债务必然涉及谁缴税、谁少领福利、谁承担资产损失。分配选择会放大既有财富与价值观分歧，削弱妥协能力。财政数字本身不会自动导致冲突，真正关键的是成本是否被认为公平分担。",ask:"这项调整让哪些人获益，又让哪些人觉得自己被牺牲？"},
    {q:"自然与技术为什么也进入宏观周期？",a:"疫情、干旱和战争会破坏供给并增加财政支出，技术则改变生产效率、就业结构和军事实力。它们不只是外部背景，而会改变债务承受能力与社会分配，因此与货币和政治周期发生反馈。",ask:"我是否把真正的供给冲击误读成单纯货币现象？"},
    {q:"整体模型会不会因为包容一切而失去解释力？",a:"这是阅读时必须保留的质疑。变量越多，事后解释越容易，事前预测却未必更准确。使用五股力量时，应分别列出可观察指标和证伪条件，避免任何新闻都能被解释为模型正确。",ask:"什么情况出现时，我会承认这套整体框架没有解释好现实？"}]},
  {id:9,title:"1865—1945年概述",part:"第三部分 · 回望过去",short:"战争、金本位与秩序重建",original:"战争与硬通货约束交替塑造债务、通胀和货币秩序。",intro:"这一段历史用于理解制度选择如何改变危机形态。战争带来巨额财政需求，硬通货安排约束货币创造，战后债务与赔偿又影响政治稳定。历史不是简单重复，但约束与选择会反复出现。",keys:["战争债务","金本位","1945年"],questions:[
    {q:"战争为什么会加速债务与货币制度变化？",a:"战争同时增加军费、破坏生产能力并压缩正常税收，政府更容易诉诸举债和货币创造。战后既有债务需要处理，原有货币安排也可能无法维持，因此军事冲突常常成为财政与货币秩序的转折点。",ask:"这场冲击主要破坏了收入端、支出端，还是两者同时？"},
    {q:"硬通货约束为什么既能建立信用，也会加剧痛苦？",a:"它限制随意扩表，增强货币承诺的可信度；但在通缩或银行危机中，也限制政策救助，迫使价格和工资承担调整。制度没有纯粹优点，关键要看经济需要稳定信用还是吸收冲击。",ask:"我赞美硬约束时，是否也计算了危机中的调整成本？"},
    {q:"为什么1945年适合作为后续章节的起点？",a:"战后建立了以美国为中心的货币、金融与地缘政治安排，之后的主要变化都能在这套秩序的形成、松动和重构中定位。先理解起点，才能区分普通政策波动与真正制度转换。",ask:"我正在观察的是秩序内部变化，还是秩序本身变化？"}]},
  {id:10,title:"1945年至今的大债务周期简要回顾",part:"第三部分 · 回望过去",short:"几次制度转换而非一条直线",original:"1945年以来的历史，更像几次货币制度转换，而不是一条平稳直线。",intro:"从战后挂钩货币，到1971年后的法定货币，再到2008年的资产购买和2020年的财政货币协同，每一次政策工具变化都回应了上一阶段的约束。把阶段分开，才能避免用今天的央行经验解释所有历史。",keys:["布雷顿森林","法定货币","政策范式"],questions:[
    {q:"1971年为什么不仅是金价制度的技术调整？",a:"美元与黄金脱钩改变了全球货币锚，政策制定者获得更大货币空间，汇率和信用约束也随之改变。它影响了此后通胀、利率和债务扩张的环境，因此是制度转换，而非孤立市场事件。",ask:"货币锚改变后，哪些旧约束消失了，哪些新约束出现了？"},
    {q:"2008年为什么改变货币政策工具箱？",a:"政策利率接近下限后，传统降息空间不足，央行开始更大规模购买资产，通过长期利率、信贷条件和资产价格传导。政策从主要调节短端价格，转向更直接地影响资产负债表。",ask:"我是否仍只用政策利率判断货币环境松紧？"},
    {q:"2020年的政策组合与2008年有何不同？",a:"2008年重点修复金融系统，2020年则出现更直接的财政转移与收入支持，央行扩表为财政和金融条件提供配合。货币进入居民和企业支出的路径更短，因此需求与通胀表现也不同。",ask:"资金是在修复金融资产负债表，还是直接进入实体支出？"}]},
  {id:11,title:"1945—1971年的挂钩货币体系（硬通货体系）",part:"第三部分 · 回望过去",short:"信用承诺与政策空间的交换",original:"挂钩货币提供信用约束，也限制了危机时的政策空间。",intro:"战后体系把美元与黄金、其他货币与美元连接起来。它能降低汇率不确定性并支持贸易，也要求美国维持外部信任。当全球美元需求与黄金兑付承诺发生矛盾时，制度本身的张力就会显现。",keys:["美元黄金","固定汇率","外部约束"],questions:[
    {q:"固定汇率为什么能促进战后贸易恢复？",a:"它降低跨境交易的汇率风险，让企业更容易定价和投资，也把各成员的政策纪律连接在一起。但稳定并不是自然产生的，需要主要发行国维持偿付承诺，其他国家也要配合内部调整。",ask:"汇率稳定的收益背后，谁承担了政策约束？"},
    {q:"美元的双重角色为什么会形成矛盾？",a:"世界经济需要更多美元流动性，美元又要维持与黄金的固定兑换。海外美元越多，市场越可能怀疑黄金承诺能否完全兑现。提供全球流动性与维持稀缺资产锚之间，存在难以长期回避的张力。",ask:"一种货币同时服务国内政策与全球储备时会发生什么冲突？"},
    {q:"硬通货体系能阻止债务扩张吗？",a:"不能完全阻止。银行信贷和财政债务仍会增长，只是外部兑付约束更强，危机时更难用货币创造吸收。它改变的是风险表现形式和调整方式，而不是消除周期。",ask:"我是否把约束货币发行误当成消除所有信用风险？"}]},
  {id:12,title:"1971—2008年的法定货币与由利率驱动的货币政策",part:"第三部分 · 回望过去",short:"利率工具主导的时代",original:"法定货币让利率成为主要调节工具，也让长期债务扩张更容易。",intro:"脱离黄金锚后，央行主要通过利率和银行信贷影响经济。长期利率下降提高了资产估值与借贷能力，也支持债务扩张。理解2008年前的繁荣，需要同时看到通胀治理成果和杠杆积累。",keys:["法定货币","利率政策","杠杆扩张"],questions:[
    {q:"法定货币为什么提高了政策灵活性？",a:"货币不再受固定兑换数量直接约束，央行可以在衰退时降息、扩表并提供流动性。这种灵活性有助于吸收冲击，但也要求政策信誉替代外部硬锚，防止灵活性演变为长期透支。",ask:"当硬锚消失后，是什么让货币仍值得信任？"},
    {q:"长期利率下降如何同时推动繁荣与脆弱？",a:"融资成本下降会鼓励投资，既有资产估值也会上升，形成财富效应。但低利率还会提高债务承载能力，使借款和资产价格相互强化。当利率方向反转，依赖低利率建立的估值和杠杆会更敏感。",ask:"当前的偿债能力在利率上升后还能成立吗？"},
    {q:"为什么2008年代表这一阶段的边界？",a:"私人部门高杠杆与房地产、金融产品相互连接，危机后政策利率很快接近下限，传统工具难以继续提供足够刺激。央行由此进入更大规模资产购买阶段，货币政策与财政、金融稳定的关系也更紧。",ask:"这次危机暴露了哪一种此前被低估的共同敞口？"}]},
  {id:13,title:"2008—2020年的法定货币与债务货币化",part:"第三部分 · 回望过去",short:"资产购买改变了什么",original:"当利率接近下限，购买资产成为央行继续放松金融条件的方式。",intro:"量化宽松通过准备金与资产交换影响长期利率和市场流动性。它与直接把财政支出打进居民账户并不相同。这个阶段消费通胀相对温和，但资产估值、财富分配和财政融资都深受低利率影响。",keys:["量化宽松","资产价格","准备金"],questions:[
    {q:"量化宽松是否等同于直接给政府开支印钞？",a:"两者都涉及央行扩表，但传导不同。量化宽松主要在金融市场购买资产、形成银行准备金，直接财政货币化则更直接地支持政府支出。区分路径，才能理解为什么早期消费通胀有限而资产价格更敏感。",ask:"新创造的钱首先进入金融市场，还是居民与企业账户？"},
    {q:"为什么低消费通胀仍可能伴随分配问题？",a:"资产购买压低贴现率并抬高部分资产价格，持有股票、债券和房产的人受益更明显，没有资产的人主要依赖工资增长。即使消费价格稳定，财富差距和社会感受也可能恶化。",ask:"平均价格稳定是否掩盖了不同群体的真实体验？"},
    {q:"长期低利率给后续阶段留下什么约束？",a:"政府和市场主体形成更高债务，资产估值也更依赖低贴现率。当通胀要求加息时，财政利息、债券估值和金融稳定会同时承压。过去用来稳定系统的低利率，也提高了退出的敏感度。",ask:"哪些资产负债表只有在低利率延续时才稳健？"}]},
  {id:14,title:"自2020年起的疫情与巨额财政赤字的货币化",part:"第三部分 · 回望过去",short:"财政与货币重新连接",original:"疫情把财政救助、央行扩表与通胀重新连接在一起。",intro:"疫情首先造成生产、工作和收入的突然中断，财政政策直接支持家庭与企业，央行则维持市场功能并提供宽松条件。与单纯金融危机相比，供给受损和大规模转移支付同时存在，使通胀与分配问题更突出。",keys:["疫情冲击","财政赤字","通胀"],questions:[
    {q:"疫情救助为什么不能简单套用2008年的解释？",a:"2008年主要是金融资产负债表受损，疫情还直接限制劳动、运输和生产。财政转移更接近居民最终收入，供给恢复又受约束，因此资金进入实体需求的程度和通胀传导都不一样。",ask:"当时的主要约束是缺需求，还是也缺供给能力？"},
    {q:"财政货币协同为什么有效又危险？",a:"危机时它能迅速阻止收入坍塌和市场失灵，但若经济已接近供给上限，持续赤字与宽松会增加通胀压力。政策有效并不意味着可以长期维持，退出时机和供给恢复同样重要。",ask:"应急措施在什么条件下应从必要变成需要退出？"},
    {q:"通胀为什么也会改变政治与债务格局？",a:"通胀影响不同群体的实际收入，并迫使利率和财政补贴重新定价。名义税收可能增加，旧债实际负担可能下降，但新债利率和社会不满会上升。它是经济变量，也是分配与政治变量。",ask:"通胀带来的账面改善，是否值得它造成的实际分配成本？"}]},
  {id:15,title:"1945年至今的中国大周期概述",part:"第三部分 · 回望过去",short:"用自己的制度条件理解中国",original:"理解中国债务，必须同时看高储蓄、金融制度、资本流动与生产能力。",intro:"阅读中国案例时，不宜把美国模板直接搬来。债务由谁持有、银行体系如何传导、资本账户是否开放、国内储蓄与产能是否充足，都会改变风险表现。更重要的是识别内部结构，而不是猜一个统一的危机日期。",keys:["高储蓄","金融制度","生产能力"],questions:[
    {q:"为什么不能直接用家庭现金流类推中国国家债务？",a:"宏观部门的收入与支出相互关联，政府税收也受整体经济影响。若国内储蓄充足、产能有余且债务以本币为主，约束会不同于外币融资的小经济体。徐高的批评正是提醒读者把生产能力和储蓄纳入分析。",ask:"我是否把微观现金流硬套到了宏观部门？"},
    {q:"高储蓄如何改变债务的供需关系？",a:"债务需要有人愿意持有，高储蓄为本币债券和银行存款提供了较强需求基础。它能降低融资难度，却不保证资金配置效率。若储蓄持续流向低回报项目，未来增长与资产质量仍会受到影响。",ask:"融资容易是否掩盖了资本回报不足？"},
    {q:"观察中国债务风险应增加哪些维度？",a:"除总债务外，还要看地方与中央的结构、房地产和土地财政、银行资产质量、企业现金流、居民收入与外部收支。风险可能表现为增长放缓和资产负债表收缩，而不一定以典型外债危机出现。",ask:"我担心的是突然违约，还是长期低增长与调整成本？"}]},
  {id:16,title:"日本案例及其启示",part:"第三部分 · 回望过去",short:"高债务为何没有按剧本爆发",original:"日本说明高债务可以长期维持，也说明了低增长与老龄化的长期代价。",intro:"日本长期低利率、央行大量持债与高政府债务并存，却没有按简单模型迅速出现典型主权危机。这要求读者回到国内储蓄、通胀、债务持有人和货币条件，同时也不能据此推导债务可以无限增长。",keys:["日本债务","低利率","老龄化"],questions:[
    {q:"日本为什么没有按高债务剧本迅速发生危机？",a:"长期低通胀、国内储蓄、稳定的本币融资和央行支持共同压低了偿债压力。这个案例说明债务率不是充分条件，融资结构与宏观环境可以显著延长调整时间，也削弱了机械阈值的解释力。",ask:"哪些特殊条件支撑了日本，而这些条件是否稳定存在？"},
    {q:"低利率维持债务的代价是什么？",a:"低利率减轻财政与债务人负担，也可能降低资源出清效率，并让金融体系高度依赖宽松条件。一旦通胀或收益率持续上升，央行资产估值和政策选择会更复杂。成本可能延后，而非消失。",ask:"低成本融资是在提高效率，还是只是在推迟调整？"},
    {q:"日本经验能否证明其他国家也可以无限发债？",a:"不能。各国人口、储蓄、货币地位、增长和外部融资条件不同。日本提供的是对简单债务决定论的反例，不是无限债务的证明。真正可迁移的是分析条件的方法，而不是一个宽松结论。",ask:"我借鉴的是条件分析，还是只借用了自己想要的结论？"}]},
  {id:17,title:"我的指标揭示了什么",part:"第四部分 · 展望未来",short:"用仪表盘代替末日时钟",original:"指标能揭示脆弱性，却不能给出危机发生的精确日期。",intro:"这一章适合做成自己的观察表：财政赤字与利息、债券期限与买家、长端利率、汇率、储备、央行损失和社会冲突。指标越多，越要防止重复计数，也要记录相反证据和模型失效的可能。",keys:["风险指标","储备货币","证伪条件"],questions:[
    {q:"一张有用的债务风险仪表盘应包含什么？",a:"至少包括初级赤字、利息支出、债务期限、平均融资成本、债券净发行与买家、长端利率、汇率和储备。研究央行时还要观察资产损失与负债成本，研究政治时则看分配冲突和制度妥协能力。",ask:"我的指标是否覆盖财政、市场、货币和政治四个层面？"},
    {q:"储备货币地位为什么能延缓但不能取消约束？",a:"全球储备需求让发行国更容易以本币融资，并降低传统国际收支危机的概率。但如果政策持续削弱购买力、产权规则或地缘信任，持有人仍会寻找替代资产。特权提高承受力，不等于免除信用责任。",ask:"当前变化是在使用储备货币优势，还是在消耗它？"},
    {q:"为什么指标预警不应被写成确定年份的预言？",a:"危机需要脆弱性，也常需要触发事件和政策反应。相同指标可以维持很久，市场叙事又会改变买家行为。徐高等学者的批评也说明，不同宏观框架会对同一组数据给出不同解释，因此必须保留证伪条件。",ask:"什么数据持续出现时，我会降低而不是提高风险判断？"}]},
  {id:18,title:"我的“3%三部分”解决方案",part:"第四部分 · 展望未来",short:"共同分担而非无成本答案",original:"3%方案的核心是共同分担，而不是寻找没有成本的答案。",intro:"作者主张通过削减支出、增加税收和降低利率，把美国预算赤字降到GDP的3%左右。公开访谈中，他也承认政治成功概率很低。阅读重点不应停在比例，而在三部分能否协调，以及成本由谁承担。",keys:["3%方案","财政调整","政治可行性"],questions:[
    {q:"为什么方案要同时使用支出、税收和利率？",a:"单靠一项工具，调整幅度会更大，政治和经济冲击也更集中。组合可以分散成本，并减轻债务供需压力。但降息并不是财政免费午餐，它必须与通胀和金融稳定相容，不能由财政需要单独决定。",ask:"三部分是在相互支持，还是其中一项把成本转嫁给了另一项？"},
    {q:"3%目标应被当作普遍安全线吗？",a:"不宜。不同国家的债务率、增长、利息、货币地位和政治能力不同，同一个赤字比例可能对应不同结果。它更像针对特定美国情境的政策锚，而不是适用于所有经济体和所有时期的自然定律。",ask:"这个目标适用于哪个国家、哪个起点和哪段时间？"},
    {q:"方案最大的障碍是算术还是政治？",a:"算术可以说明需要多大调整，政治决定谁愿意承担。福利、税收和利率都触及核心利益，绝对化的竞选承诺又会压缩妥协空间。若缺乏可信而公平的分担安排，技术上合理的方案也可能无法执行。",ask:"我是否把政治执行力当作了财政模型的外生常量？"}]},
  {id:19,title:"我眼中的未来",part:"第四部分 · 展望未来",short:"在约束中保留选择",original:"未来不是被周期写好的剧本，而是约束条件下仍可选择的路径。",intro:"结尾把视线拉回行动：政策制定者能否及早调整，社会能否公平分担成本，投资者能否识别实际购买力风险，个人能否避免单一叙事。周期提供的是风险管理框架，不是让人放弃判断的宿命论。",keys:["实际回报","政策选择","风险管理"],questions:[
    {q:"这本书最值得带走的不是哪一个末日结论？",a:"更重要的是把支付承诺、收入、融资需求与货币信用连成一条链，并理解不同制度会改变危机形态。具体美国判断可以被争论，分析债务供需和实际购买力的方法却有更广泛的用途。",ask:"我记住的是一个惊悚预测，还是一套可以复算的方法？"},
    {q:"普通投资者应如何把周期框架变成风险管理？",a:"不必因一本书押注单一资产或时间点。更合理的是检查资产对通胀、利率、汇率和政策管制的敏感性，区分名义收益与实际收益，并保留流动性与分散。黄金、股票和债券都应放回估值与组合，而非当作信仰。",ask:"我的组合最依赖哪一种宏观环境，如果它反转会怎样？"},
    {q:"怎样在重视预警与反对宿命论之间保持平衡？",a:"承认历史中存在重复机制，也承认政策、技术和制度学习能够改变路径。好的阅读既不一味安慰这次不同，也不把崩溃当作必然。把预警转化为可执行的改革和风险控制，才是模型的建设性用途。",ask:"我正在用悲观推动准备，还是用它替代行动？"}]}
];

const paths = [
  {symbol:"模",title:"模型入门",desc:"先弄清支付承诺、信贷机制与债务率动态。",chapters:[1,2,3]},
  {symbol:"警",title:"危机识别",desc:"沿九个阶段，观察债券、利率、汇率与央行。",chapters:[4,5,6,7,17]},
  {symbol:"史",title:"货币制度史",desc:"从1945年到疫情，辨认真正的政策范式变化。",chapters:[9,10,11,12,13,14]},
  {symbol:"鉴",title:"中国与日本",desc:"用不同制度条件检验简单债务决定论。",chapters:[15,16]},
  {symbol:"策",title:"政策与分歧",desc:"理解五股力量、3%方案及其政治约束。",chapters:[8,18,19]}
];
const plans = [
  ["第一日","建立模型","读第1—3章。用自己的话解释：债务为什么会同时带来增长与约束？",1],
  ["第二日","识别危机","读第4—7章。挑出三个可观察的红色警报，并写下它们的反证。",4],
  ["第三日","看见整体","读第8—10章。区分单一债务周期与五股力量的整体大周期。",8],
  ["第四日","理解制度","读第11—14章。比较1971、2008与2020年分别改变了什么。",11],
  ["第五日","对照案例","读第15—16章。写下中国、日本与美国不能直接类比的两个条件。",15],
  ["第六日","校准方案","读第17—18章。做一张指标表，并分析3%方案的成本由谁承担。",17],
  ["第七日","形成判断","读第19章。写下作者最有用的方法、最弱的假设与你的应对原则。",19]
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const store = {
  get(k,fallback){try{return JSON.parse(localStorage.getItem("countries_broke_"+k)) ?? fallback}catch{return fallback}},
  set(k,v){try{localStorage.setItem("countries_broke_"+k,JSON.stringify(v))}catch{}}
};
let readChapters = store.get("read",[]);
let notes = store.get("notes",{});
let currentChapter = 1;
let daily = null;
let fontSize = store.get("font",17);
let dark = store.get("dark",false);

function chapter(id){return chapters.find(c=>c.id===Number(id))}
function toast(text){const t=$("#toast");t.textContent=text;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),1800)}
function saveRead(){store.set("read",readChapters);renderProgress();renderChapters();renderSidebar()}
function renderProgress(){
  const n=readChapters.length,p=Math.round(n*100/chapters.length);
  $("#progressBar").style.width=p+"%";$("#sideProgressBar").style.width=p+"%";
  $("#progressText").textContent=n?`已读 ${n} / ${chapters.length} 章 · ${p}%`:"尚未开始";
  $("#sideProgressText").textContent=`阅读进度 ${p}%`;
  $("#continueBtn").textContent=n===chapters.length?"重新阅读第一章 →":n?`继续第 ${Math.min(chapters.length,Math.max(...readChapters)+1)} 章 →`:"从第一章开始 →";
  $("#noteCount").textContent=Object.values(notes).filter(v=>v&&v.trim()).length;
}
function renderChapters(){
  $("#chapterGrid").innerHTML=chapters.map(c=>`<button class="chapter-card" data-chapter="${c.id}"><span class="chapter-index">${String(c.id).padStart(2,"0")}</span><span><h3>${c.title}${readChapters.includes(c.id)?'<i class="read-dot">已读</i>':""}</h3><p>${c.short}。${c.keys.join(" · ")}</p><span class="chapter-page">${c.part}</span></span><span class="chapter-arrow">→</span></button>`).join("");
  $$("[data-chapter]").forEach(b=>b.addEventListener("click",()=>openChapter(b.dataset.chapter)));
}
function renderPaths(){
  $("#pathGrid").innerHTML=paths.map((p,i)=>`<button class="path-card" data-path="${i}"><span class="path-symbol">${p.symbol}</span><h3>${p.title}</h3><p>${p.desc}</p><span>${p.chapters.map(id=>chapter(id).title).join(" · ")} →</span></button>`).join("");
  $$("[data-path]").forEach(b=>b.addEventListener("click",()=>openChapter(paths[b.dataset.path].chapters[0])));
}
function renderPlans(){
  $("#planList").innerHTML=plans.map(p=>`<div class="plan-item"><span class="plan-day">${p[0]}</span><h3>${p[1]}</h3><p>${p[2]}</p><button data-plan="${p[3]}">开始这一日 →</button></div>`).join("");
  $$("[data-plan]").forEach(b=>b.addEventListener("click",()=>openChapter(b.dataset.plan)));
}
function renderSidebar(){
  $("#sidebarChapters").innerHTML=chapters.map(c=>`<button class="side-chapter ${c.id===currentChapter?'active':''}" data-side="${c.id}"><span>${String(c.id).padStart(2,"0")}${readChapters.includes(c.id)?'<i class="side-read"> ·</i>':""}</span><span>${c.title}</span></button>`).join("");
  $$("[data-side]").forEach(b=>b.addEventListener("click",()=>openChapter(b.dataset.side)));
}
function renderChapter(){
  const c=chapter(currentChapter),read=readChapters.includes(c.id);
  document.documentElement.style.setProperty("--reader-size",fontSize+"px");
  $("#chapterContent").innerHTML=`<header class="chapter-header"><span class="chapter-no">CHAPTER ${String(c.id).padStart(2,"0")} · ${c.part}</span><h1>${c.title}</h1><p class="chapter-original">${c.original}</p><p class="chapter-intro">${c.intro}</p><div class="key-ideas">${c.keys.map(k=>`<span>${k}</span>`).join("")}</div></header>${c.questions.map((q,i)=>`<section class="anchor-card" id="q${c.id}-${i}"><span class="anchor-label">阅读锚点 ${String(i+1).padStart(2,"0")} · 本站原创导读</span><h2>${q.q}</h2><p>${q.a}</p><div class="self-ask"><strong>留给自己</strong>${q.ask}</div></section>`).join("")}<div class="chapter-actions"><button class="mark-read ${read?'is-read':''}" id="markRead">${read?'✓ 已标记读完':'标记本章读完'}</button><button class="next-chapter" id="nextChapter">${c.id===chapters.length?'回到阅读地图 →':`下一章：${chapter(c.id+1).title} →`}</button></div>`;
  $("#markRead").addEventListener("click",()=>{if(readChapters.includes(c.id)){readChapters=readChapters.filter(id=>id!==c.id)}else{readChapters.push(c.id);toast("本章进度已保存")};saveRead();renderChapter()});
  $("#nextChapter").addEventListener("click",()=>c.id===chapters.length?goHome():openChapter(c.id+1));
  document.title=`${c.title} · 国家为什么会破产：大周期`;
}
function openChapter(id,anchor){
  stopAudio();
  currentChapter=Number(id);$("#homeView").hidden=true;$("#readerView").hidden=false;
  renderChapter();renderSidebar();renderProgress();window.scrollTo({top:0,behavior:"instant"});
  history.replaceState(null,"",`#chapter-${currentChapter}${anchor||""}`);
  if(anchor)setTimeout(()=>document.querySelector(anchor)?.scrollIntoView(),0);
}
function goHome(section){
  stopAudio();
  $("#readerView").hidden=true;$("#homeView").hidden=false;document.title="国家为什么会破产：大周期 · 读书站";
  history.replaceState(null,"",section?`#${section}`:"#");
  if(section)setTimeout(()=>document.getElementById(section)?.scrollIntoView(),0);else window.scrollTo({top:0,behavior:"instant"});
  renderProgress();
}
function setDaily(q){
  daily=q;$("#dailyTitle").textContent=q.item.q;$("#dailyGuide").textContent=q.item.a;
  $("#dailyOpen").textContent=`进入「${q.c.title}」 →`;
}
function randomQuestion(){
  const c=chapters[Math.floor(Math.random()*chapters.length)],i=Math.floor(Math.random()*3);
  setDaily({c,item:c.questions[i],index:i});
}
function openSearch(){
  $("#searchDialog").showModal();$("#searchInput").value="";renderSearch("");setTimeout(()=>$("#searchInput").focus(),50);
}
function renderSearch(term){
  const results=[];
  chapters.forEach(c=>c.questions.forEach((q,i)=>{const text=c.title+c.original+c.intro+q.q+q.a+q.ask+c.keys.join("");if(!term||text.toLowerCase().includes(term.toLowerCase()))results.push({c,q,i})}));
  $("#searchResults").innerHTML=results.length?results.slice(0,30).map(r=>`<button class="search-result" data-result="${r.c.id}-${r.i}"><small>${r.c.title} · 阅读锚点 ${r.i+1}</small><strong>${r.q.q}</strong><p>${r.q.ask}</p></button>`).join(""):`<div class="empty-state">没有找到相关内容，试试“央行”“日本”或“3%”。</div>`;
  $$("[data-result]").forEach(b=>b.addEventListener("click",()=>{const [id,i]=b.dataset.result.split("-").map(Number);$("#searchDialog").close();openChapter(id,`#q${id}-${i}`)}));
}
function openNotes(id){
  if(id)currentChapter=Number(id);
  $("#notesTitle").textContent=`阅读笔记 · ${chapter(currentChapter).title}`;
  $("#notesEditor").innerHTML=`<select class="note-chapter-select" id="noteChapterSelect">${chapters.map(c=>`<option value="${c.id}" ${c.id===currentChapter?'selected':''}>${String(c.id).padStart(2,"0")} · ${c.title}</option>`).join("")}</select><textarea class="note-textarea" id="noteText" placeholder="写下一个判断、一处质疑，或需要继续核实的数据……">${notes[currentChapter]||""}</textarea><div class="note-save-row"><span id="noteStatus">自动保存在当前浏览器</span><button class="primary-button" id="saveNote">保存笔记</button></div>`;
  $("#notesDialog").showModal();
  $("#noteChapterSelect").addEventListener("change",e=>{saveCurrentNote(false);currentChapter=Number(e.target.value);$("#notesDialog").close();openNotes(currentChapter)});
  $("#noteText").addEventListener("input",()=>{notes[currentChapter]=$("#noteText").value;store.set("notes",notes);renderProgress();$("#noteStatus").textContent="已自动保存 "+new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})});
  $("#saveNote").addEventListener("click",()=>{saveCurrentNote(true);$("#notesDialog").close()});
}
function saveCurrentNote(showToast){
  if($("#noteText"))notes[currentChapter]=$("#noteText").value;
  store.set("notes",notes);renderProgress();if(showToast)toast("笔记已保存");
}
function exportNotes(){
  const entries=Object.entries(notes).filter(([,v])=>v&&v.trim());
  if(!entries.length){toast("还没有可导出的笔记");return}
  let text="# 《国家为什么会破产：大周期》阅读笔记\n\n> 导出时间："+new Date().toLocaleString("zh-CN")+"\n";
  entries.sort((a,b)=>Number(a[0])-Number(b[0])).forEach(([id,v])=>{text+=`\n\n## ${chapter(id).title}\n\n${v}`});
  const url=URL.createObjectURL(new Blob([text],{type:"text/markdown;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="国家为什么会破产_阅读笔记.md";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast("笔记已导出");
}
const listen = {index:0,active:false,paused:false,session:0,length:4};
const audioElement=$("#audioElement");
function audioSupported(){return !!audioElement&&audioElement.canPlayType("audio/mpeg")!==""}
function renderAudio(){
  $("#audioTitle").textContent=chapter(currentChapter).title;
  $("#audioProgress").textContent=`第 ${listen.index+1} / ${listen.length} 段`;
  $("#audioPlay").textContent=listen.active&&!listen.paused?"❚❚":"▶";
  $("#audioPlay").setAttribute("aria-label",listen.active&&!listen.paused?"暂停":"播放");
  $("#audioKicker").textContent=listen.paused?"已暂停":"正在聆听";
}
function updateMediaSession(){
  if(!("mediaSession" in navigator)||!("MediaMetadata" in window))return;
  navigator.mediaSession.metadata=new MediaMetadata({
    title:`${chapter(currentChapter).title} · 第 ${listen.index+1} 段`,
    artist:"国家为什么会破产 · 中文导读",
    album:"晓晓自然女声"
  });
}
async function playCurrent(){
  if(!listen.active)return;
  const session=++listen.session;
  audioElement.src=`audio/chapter-${String(currentChapter).padStart(2,"0")}-segment-${listen.index+1}.mp3`;
  audioElement.playbackRate=Number($("#rateSelect").value);
  audioElement.load();
  renderAudio();updateMediaSession();
  try{await audioElement.play()}
  catch(error){
    if(session!==listen.session||!listen.active)return;
    listen.active=false;listen.paused=false;renderAudio();
    toast("音频未能播放，请检查网络后重试");
  }
}
function startListening(index=0){
  if(!audioSupported()){toast("当前浏览器无法播放音频，请使用最新版浏览器");return}
  if($("#readerView").hidden)openChapter(currentChapter);
  listen.index=Math.max(0,Math.min(index,listen.length-1));
  listen.active=true;listen.paused=false;$("#audioPlayer").hidden=false;
  playCurrent();
}
function toggleListening(){
  if(!listen.active){startListening();return}
  if(listen.paused||audioElement.paused){listen.paused=false;audioElement.play().catch(()=>toast("请再次点击播放"))}
  else audioElement.pause();
  renderAudio();
}
function stopAudio(){
  listen.session++;listen.active=false;listen.paused=false;
  audioElement.pause();audioElement.removeAttribute("src");audioElement.load();
  if($("#audioPlayer"))$("#audioPlayer").hidden=true;
  if("mediaSession" in navigator)navigator.mediaSession.metadata=null;
}
function skipAudio(delta){
  if(!listen.active){startListening(delta>0?0:3);return}
  listen.index=Math.max(0,Math.min(listen.index+delta,listen.length-1));
  listen.paused=false;playCurrent();
}
function restartAudioSetting(){
  store.set("rate",$("#rateSelect").value);
  audioElement.playbackRate=Number($("#rateSelect").value);
}
function bind(){
  $("#startBtn").addEventListener("click",()=>openChapter(readChapters.length?Math.min(chapters.length,Math.max(...readChapters)+1):1));
  $("#continueBtn").addEventListener("click",()=>openChapter(readChapters.length===chapters.length?1:readChapters.length?Math.min(chapters.length,Math.max(...readChapters)+1):1));
  $("#randomBtn").addEventListener("click",()=>{randomQuestion();$("#dailyQuestion").scrollIntoView()});
  $("#refreshQuestion").addEventListener("click",randomQuestion);
  $("#dailyOpen").addEventListener("click",()=>daily&&openChapter(daily.c.id,`#q${daily.c.id}-${daily.index}`));
  $("#searchBtn").addEventListener("click",openSearch);$("#readerSearch").addEventListener("click",openSearch);
  $("#searchInput").addEventListener("input",e=>renderSearch(e.target.value.trim()));
  $("#notesBtn").addEventListener("click",()=>openNotes(currentChapter));$("#chapterNoteBtn").addEventListener("click",()=>openNotes(currentChapter));
  $("#backHome").addEventListener("click",()=>goHome());
  $$("[data-home]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();goHome()}));
  $$("[data-home-section]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();goHome(a.dataset.homeSection)}));
  $$("[data-close]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.close).close()));
  $("#fontDown").addEventListener("click",()=>{fontSize=Math.max(14,fontSize-1);store.set("font",fontSize);renderChapter()});
  $("#fontUp").addEventListener("click",()=>{fontSize=Math.min(22,fontSize+1);store.set("font",fontSize);renderChapter()});
  $("#themeBtn").addEventListener("click",()=>{dark=!dark;store.set("dark",dark);applyTheme()});
  $("#exportBtn").addEventListener("click",exportNotes);
  $("#listenBtn").addEventListener("click",()=>startListening());
  $("#readerListen").addEventListener("click",()=>startListening());
  $("#audioPlay").addEventListener("click",toggleListening);
  $("#audioStop").addEventListener("click",stopAudio);
  $("#audioPrev").addEventListener("click",()=>skipAudio(-1));
  $("#audioNext").addEventListener("click",()=>skipAudio(1));
  $("#rateSelect").addEventListener("change",restartAudioSetting);
  audioElement.addEventListener("play",()=>{listen.paused=false;renderAudio()});
  audioElement.addEventListener("pause",()=>{if(listen.active&&!audioElement.ended){listen.paused=true;renderAudio()}});
  audioElement.addEventListener("ended",()=>{
    if(!listen.active)return;
    if(listen.index<listen.length-1){listen.index++;playCurrent()}
    else{stopAudio();toast("本章播放完毕")}
  });
  audioElement.addEventListener("error",()=>{
    if(!listen.active)return;
    listen.active=false;listen.paused=false;renderAudio();
    toast("音频加载失败，请检查网络后重试");
  });
  if("mediaSession" in navigator){
    const actions={play:toggleListening,pause:()=>audioElement.pause(),stop:stopAudio,previoustrack:()=>skipAudio(-1),nexttrack:()=>skipAudio(1)};
    Object.entries(actions).forEach(([action,handler])=>{try{navigator.mediaSession.setActionHandler(action,handler)}catch{}});
  }
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!$("dialog[open]")&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();openSearch()}if(e.key==="Escape")$$("dialog[open]").forEach(d=>d.close())});
  $$("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
}
function applyTheme(){document.documentElement.dataset.theme=dark?"dark":"light";$("#themeBtn").textContent=dark?"☀":"◐"}
function init(){
  applyTheme();renderChapters();renderPaths();renderPlans();renderSidebar();renderProgress();bind();randomQuestion();
  $("#rateSelect").value=store.get("rate","1");
  audioElement.playbackRate=Number($("#rateSelect").value);
  const match=location.hash.match(/^#chapter-(\d+)/);if(match)openChapter(match[1]);
}
init();
