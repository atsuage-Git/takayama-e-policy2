import { GuidebookPage } from '../types';

export const GUIDEBOOK_PAGES: GuidebookPage[] = [
  {
    id: 1,
    fileName: '001_地域の産業人材育成ロードマップ.png',
    fileNumber: '001',
    sortOrder: 1,
    category: 'roadmap',
    categoryLabel: '人材育成基本方針',
    title: '地域の産業人材育成ロードマップ',
    subtitle: '持続可能な地域経済を担う人づくり・産業基盤強化の全体像',
    targetAudience: ['市内全企業', '教育機関', '地域住民', '若者・求職者'],
    summary: '高山市における産業人材の育成・確保を包括的に推進するためのマスタープラン。教育段階から就職、定着、スキルアップ、事業承継までの一貫した支援体系を示します。',
    keyPoints: [
      '小中高・大学等との連携によるキャリア教育と地域理解の促進',
      '地元企業と連携したインターンシップ・お仕事体験の充実',
      'UIJターン人材の呼び込みと若者の地元定着支援',
      'リスキリング・DX推進・生産性向上による働きがいのある職場環境づくり'
    ],
    subsidyOrBenefit: '総合的な連携施策・各個別補助金への導線',
    requirements: '高山市内の産業人材育成方針に賛同する市内事業所・教育関係者等',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['ロードマップ', '人材育成', '全体構想', '高山市', '産業振興'],
    themeColor: {
      primary: '#5A5A40', // Forest Olive
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#5A5A40',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['総合計画', '人材基盤', '重点施策'],
    detailsList: [
      { label: '策定主体', value: '高山市 雇用・産業振興課' },
      { label: '対象期間', value: '中長期ビジョン（随時更新）' },
      { label: '連携機関', value: '高山商工会議所、市内高校、地域ラボ・高山' }
    ]
  },
  {
    id: 2,
    fileName: '401_飛騨高山お仕事発見隊の取り組み.png',
    fileNumber: '401',
    sortOrder: 2,
    category: 'internship',
    categoryLabel: 'キャリア教育・体験',
    title: '飛騨高山お仕事発見隊の取り組み',
    subtitle: '子どもたちが地域の魅力を知り、未来の働く姿を描く職場体験プログラム',
    targetAudience: ['小中学生・保護者', '受入協力企業', '学校関係者'],
    summary: '地域の子どもたち・学生が市内の魅力的な企業や職人技、プロの仕事を直接体験・見学できる体験型キャリア学習事業です。地元産業への愛着と将来の職業選択の芽を育てます。',
    keyPoints: [
      '多様な業種（ものづくり・観光・伝統産業・食・IT等）の職場見学・実務体験',
      '企業の経営者や若手社員と直接触れ合う対話型ワークショップ',
      '夏休み・春休みを活用した体験プログラムの開催',
      '受入企業にとっては未来の担い手へのPRと社員のモチベーション向上'
    ],
    subsidyOrBenefit: '受入企業の広報支援・事業コーディネート支援',
    requirements: '市内に事業所を有し、小中学生等の職場体験受入が可能な企業・団体',
    contactDepartment: '高山市 雇用・産業振興課 / 地域キャリア教育推進協議会',
    contactPhone: '0577-35-3144',
    tags: ['お仕事発見隊', '職場体験', 'キャリア教育', '小中学生', '地域企業'],
    themeColor: {
      primary: '#4A5B43', // Deep Moss
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#4A5B43',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['体験型教育', '企業PR', '次世代育成'],
    detailsList: [
      { label: '対象者', value: '市内小中学生および保護者' },
      { label: '参加企業数', value: '市内約30〜50社以上' },
      { label: '開催時期', value: '夏季休暇期間ほか定期開催' }
    ]
  },
  {
    id: 3,
    fileName: '403_ユーターンシップ紹介.png',
    fileNumber: '403',
    sortOrder: 3,
    category: 'internship',
    categoryLabel: 'UIJターン・学生支援',
    title: 'ユーターンシップ紹介',
    subtitle: '都市圏の学生・若者が飛騨高山で働くリアルを体感するU/Iターンインターン',
    targetAudience: ['大学生・大学院生', '専門学校生', '受入検討企業', 'U/Iターン希望者'],
    summary: '高山市出身の学生や飛騨高山での就職に関心のある都市圏の学生を対象に、市内の企業で実践的なインターンシップを行うプログラム。実際の業務を通じて地域の働きがいを実感できます。',
    keyPoints: [
      '都市部在住の学生が帰省や夏期休暇を利用して参加可能',
      '受入企業との事前マッチング・オンラインオリエンテーション実施',
      '滞在費や交通費の補助制度との連動で参加ハードルを軽減',
      'インターン終了後の継続的な就活フォローと地元定着支援'
    ],
    subsidyOrBenefit: '交通費・宿泊費の助成制度あり（関連補助金と連携）',
    requirements: '大学・大学院・短大・専門学校等に在籍する学生、および市内受入企業',
    contactDepartment: '高山市 雇用・産業振興課 U/Iターン推進窓口',
    contactPhone: '0577-35-3144',
    tags: ['ユーターンシップ', 'Uターン', 'Iターン', '学生インターン', '就職活動'],
    themeColor: {
      primary: '#BC6C25', // Warm Terracotta
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#BC6C25',
      badgeBg: '#F3EDE2'
    },
    visualBadges: ['学生向け', '交通費支援', '実践インターン'],
    detailsList: [
      { label: '受入期間', value: '数日間〜2週間程度（企業と調整）' },
      { label: '主な業種', value: '製造、観光、IT、建築、木工、サービス等' },
      { label: '対象学生', value: '全国の大学・専門学校生' }
    ]
  },
  {
    id: 4,
    fileName: '404_都市圏若手人材交流イベント.png',
    fileNumber: '404',
    sortOrder: 4,
    category: 'internship',
    categoryLabel: '都市圏連携・交流',
    title: '都市圏若手人材交流イベント',
    subtitle: '首都圏・中京圏と高山をつなぐ、若手プロ人材・クリエイターとの出会いの場',
    targetAudience: ['都市圏在住の若手社会人', '市内経営者・人事担当者', '副業・移住関心層'],
    summary: '東京や名古屋等の都市圏で開催される、高山市の魅力ある企業と都市部の若手ビジネスパーソンが交流するミートアップ。転職、副業・兼業、ワーケーションのきっかけを創出します。',
    keyPoints: [
      '都市圏のハブ拠点（東京・名古屋等）およびオンラインでのハイブリッド開催',
      '高山市の経営者が自社のビジョンや新規事業の課題をピッチ',
      '気軽なネットワーキングと地場産品・地酒を囲んだフリートーク',
      '副業・複業プロ人材とのマッチングや移住検討者への個別相談'
    ],
    subsidyOrBenefit: '参加費無料・現地ツアー優待案内',
    requirements: '都市圏在住の若手社会人・学生、市内登壇希望企業',
    contactDepartment: '高山市 雇用・産業振興課 / 地域共創パートナー',
    contactPhone: '0577-35-3144',
    tags: ['交流イベント', '都市圏若手', 'ミートアップ', '副業', '関係人口'],
    themeColor: {
      primary: '#6B5844', // Earth Umber
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#6B5844',
      badgeBg: '#EEE8DF'
    },
    visualBadges: ['東京・名古屋開催', '関係人口創出', '副業マッチング'],
    detailsList: [
      { label: '開催場所', value: '都内交流スペース / 名古屋 / オンライン' },
      { label: '参加企業', value: '高山市内の成長意欲の高い企業' },
      { label: 'フォロー体制', value: '現地訪問アテンド・オンライン相談' }
    ]
  },
  {
    id: 5,
    fileName: '406_高山市インターンシップ補助金ガイド.png',
    fileNumber: '406',
    sortOrder: 5,
    category: 'internship',
    categoryLabel: 'インターンシップ支援',
    title: '高山市インターンシップ補助金ガイド',
    subtitle: '学生の受入を行う市内企業および参加学生への費用負担を強力サポート',
    targetAudience: ['市内中小企業', 'インターン参加学生（市外在住）'],
    summary: '学生のインターンシップ受入にかかる企業の経費や、市外から参加する学生の交通費・宿泊費を補助する制度。優秀な若手人材の採用活動を金銭面から後押しします。',
    keyPoints: [
      '【学生向け】市外からの参加学生に対する交通費・宿泊費の助成',
      '【企業向け】インターンシップ実施に伴う受入環境整備費・広報費等の補助',
      'オンラインインターンや短期・長期プログラムにも幅広く対応',
      '申請手続きの簡素化でスピーディーな交付決定'
    ],
    subsidyOrBenefit: '学生交通費・宿泊費補助（上限あり） / 企業受入経費支援',
    requirements: '市内でインターンシップを実施する事業所、および市外から参加する学生',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['インターンシップ補助金', '交通費補助', '宿泊費支援', '学生受入', '採用支援'],
    themeColor: {
      primary: '#5A5A40', // Sage Olive
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#5A5A40',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['補助金制度', '最大支援', '事前申請要'],
    detailsList: [
      { label: '補助率', value: '対象経費の1/2〜定額助成' },
      { label: '申請時期', value: 'インターンシップ実施前（要事前相談）' },
      { label: '実績報告', value: '実施終了後30日以内' }
    ]
  },
  {
    id: 6,
    fileName: '501_「働く力」確保プラン.png',
    fileNumber: '501-1',
    sortOrder: 6,
    category: 'location',
    categoryLabel: '就労・雇用戦略',
    title: '「働く力」確保プラン',
    subtitle: '人口減少社会における地域産業の労働力・担い手確保のためのアクションプラン',
    targetAudience: ['市内全産業事業者', 'シニア・女性・若手求職者', '行政・支援機関'],
    summary: '少子高齢化・労働力不足に対処するため、潜在労働力の掘り起こし、多様な働き方の推進、省力化・自動化投資を組み合わせた総合的な雇用確保戦略です。',
    keyPoints: [
      'シニア・女性・子育て世代の短時間・柔軟な就労環境づくり',
      '外国人材の適正かつ円滑な受入環境整備と多文化共生',
      '省人化機器・AI/ITツールの導入支援による1人あたり生産性の向上',
      '市内求人情報の集約と広域的なマッチング機会の拡充'
    ],
    subsidyOrBenefit: '各種設備投資・雇用創出助成金への連携支援',
    requirements: '雇用改善・人材確保に取り組む市内全産業の事業所',
    contactDepartment: '高山市 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['働く力', '雇用確保', '多様な働き方', 'シニア就労', '生産性向上'],
    themeColor: {
      primary: '#9A6B3D', // Warm Ochre
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#9A6B3D',
      badgeBg: '#F3ECE1'
    },
    visualBadges: ['雇用ビジョン', '多様性確保', '生産性倍増'],
    detailsList: [
      { label: '重点柱', value: '人材確保・人材育成・定着促進・生産性向上' },
      { label: '対象産業', value: '製造業、観光・サービス業、農林業、医療福祉等' }
    ]
  },
  {
    id: 7,
    fileName: '501_企業立地促進制度.png',
    fileNumber: '501-2',
    sortOrder: 7,
    category: 'location',
    categoryLabel: '企業誘致・設備投資',
    title: '企業立地促進制度',
    subtitle: '工場・事業所の新設・増設、市内移転に対する手厚い税制優遇と奨励金',
    targetAudience: ['工場・事業所を新設/増設する企業', '市外からの進出企業', '市内拡張企業'],
    summary: '高山市内における産業振興と新たな雇用創出を図るため、工場や研究所、流通施設などの新設・増設を行う事業者に対して固定資産税相当額の交付や奨励金を交付する制度です。',
    keyPoints: [
      '固定資産税課税免除または不均一課税の優遇措置',
      '新規雇用者数や投下固定資産額に応じた立地奨励金の交付',
      '工業団地等の用地情報・ワンストップ相談窓口の提供',
      '地元雇用を創出した場合の追加インセンティブ'
    ],
    subsidyOrBenefit: '立地奨励金・雇用奨励金・固定資産税の減免措置',
    requirements: '投下固定資産額や新規常用雇用者数の基準を満たす立地計画',
    contactDepartment: '高山市 商工観光部 企業立地推進課',
    contactPhone: '0577-35-3144',
    tags: ['企業立地', '工場新増設', '奨励金', '固定資産税減免', '雇用創出'],
    themeColor: {
      primary: '#855836', // Timber Wood
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#855836',
      badgeBg: '#F0E7DD'
    },
    visualBadges: ['税制優遇', '大型奨励金', 'ワンストップ相談'],
    detailsList: [
      { label: '対象施設', value: '製造業、物流業、情報通信業、研究所等' },
      { label: '優遇期間', value: '最長3〜5年間' },
      { label: '要件', value: '一定額以上の投資と新規雇用' }
    ]
  },
  {
    id: 8,
    fileName: '502_サテライトオフィス等開設支援補助金.png',
    fileNumber: '502',
    sortOrder: 8,
    category: 'location',
    categoryLabel: 'サテライト・オフィス誘致',
    title: 'サテライトオフィス等開設支援補助金',
    subtitle: 'テレワーク・都市部IT企業の地方拠点進出に伴う開設費用・賃料を補助',
    targetAudience: ['市外のIT/サービス企業', 'サテライトオフィス開設事業者', 'コワーキング運営者'],
    summary: '都市圏の企業が高山市内にサテライトオフィスを開設する際の改修工事費や通信環境整備費、賃借料などを補助。豊かな自然環境でのクリエイティブな働き方を応援します。',
    keyPoints: [
      'オフィス改修費・什器備品購入費・通信ネットワーク整備費を補助',
      '開設後一定期間の建物賃借料（家賃）の一部を継続補助',
      'コワーキングスペースやシェアオフィスの新設・機能強化も対象',
      '地元人材の雇用や市内事業者とのオープンイノベーションを促進'
    ],
    subsidyOrBenefit: '開設経費（上限数百万円規模）および賃借料補助（補助率1/2〜等）',
    requirements: '市外に本社を有し、高山市内にサテライトオフィスを設置・常駐者を配置する企業',
    contactDepartment: '高山市 雇用・産業振興課 / デジタル推進課',
    contactPhone: '0577-35-3144',
    tags: ['サテライトオフィス', 'テレワーク', 'IT企業誘致', '家賃補助', 'ワーケーション'],
    themeColor: {
      primary: '#516556', // Olive Sage Slate
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#516556',
      badgeBg: '#E9EFEB'
    },
    visualBadges: ['開設費補助', '家賃助成', 'IT・リモート'],
    detailsList: [
      { label: '対象経費', value: '改修費、設備費、Wi-Fi整備費、賃借料' },
      { label: '補助上限', value: '開設費最大数百万円＋月額家賃補助' },
      { label: '地域メリット', value: '豊かな自然と歴史文化の中でのワークスタイル' }
    ]
  },
  {
    id: 9,
    fileName: '601_求人情報発信支援補助金の案内.png',
    fileNumber: '601',
    sortOrder: 9,
    category: 'recruitment',
    categoryLabel: '採用力強化・広報',
    title: '求人情報発信支援補助金の案内',
    subtitle: '採用Webサイト制作・採用動画・合同求人媒体掲載の費用をサポート',
    targetAudience: ['市内中小企業・小規模事業者', '採用活動を強化したい企業'],
    summary: '市内中小企業が人材を確保するために行う求人Webサイトの構築・リニューアル、採用PR動画の制作、就職情報サイトやパンフレット等の広報費用を助成します。',
    keyPoints: [
      '自社採用サイトの新設・スマホ対応リニューアルにかかる経費補助',
      '職場の雰囲気や先輩社員の声を伝える動画コンテンツ制作補助',
      '大手就職情報ナビや求人広告媒体への掲載料補助',
      '企業のブランディングと魅力発信で若手・転職者の応募を促進'
    ],
    subsidyOrBenefit: '対象経費の1/2以内（限度額：20万〜50万円程度）',
    requirements: '市内に主たる事業所を有し、従業員の新規雇用を計画している中小企業者',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['求人情報発信', '採用サイト', '採用動画', '広報支援', '採用力向上'],
    themeColor: {
      primary: '#BC6C25', // Earth Amber
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#BC6C25',
      badgeBg: '#F7EFE6'
    },
    visualBadges: ['補助率 1/2', '採用動画OK', 'Webリニューアル'],
    detailsList: [
      { label: '補助率', value: '対象経費の1/2以内' },
      { label: '対象経費', value: 'HP制作費、動画撮影費、求人媒体掲載料' },
      { label: '申請締切', value: '予算上限に達し次第終了（事前申請）' }
    ]
  },
  {
    id: 10,
    fileName: '602_合同企業説明会 .png',
    fileNumber: '602',
    sortOrder: 10,
    category: 'recruitment',
    categoryLabel: 'マッチング・合説',
    title: '合同企業説明会',
    subtitle: '地元企業と就活生・求職者が一堂に会する大型マッチングイベント',
    targetAudience: ['新卒予定者（高校・大学等）', '中途・一般求職者', '出展希望の市内企業'],
    summary: '飛騨地域の優良企業がブースを出展し、高校生・大学生や一般求職者に企業の魅力や仕事内容を直接伝える合同企業説明会。対面面談とオンライン合説を併用します。',
    keyPoints: [
      '春・夏・冬の採用シーズンに合わせた定期開催',
      '高校生向け・大学生向け・一般求職者向けなど対象別ブース設計',
      '企業紹介プレゼンテーションや若手社員座談会の同時開催',
      'オンライン配信やオンデマンド企業PR動画との連携'
    ],
    subsidyOrBenefit: '出展企業への集客支援・ブース提供（一部無料または格安出展）',
    requirements: '市内に事業所を有し、採用予定のある企業・団体',
    contactDepartment: '高山市 雇用・産業振興課 / ハローワーク高山 / 高山商工会議所',
    contactPhone: '0577-35-3144',
    tags: ['合同企業説明会', '合説', '新卒採用', '中途採用', 'マッチング'],
    themeColor: {
      primary: '#735745', // Warm Chestnut
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#735745',
      badgeBg: '#EDE5DF'
    },
    visualBadges: ['年複数回開催', '対面＆オンライン', 'ハローワーク連携'],
    detailsList: [
      { label: '参加企業規模', value: '各回30〜60社程度' },
      { label: '開催場所', value: '飛騨・世界生活文化センター等' },
      { label: '参加費', value: '求職者参加無料' }
    ]
  },
  {
    id: 11,
    fileName: '603_創業・経営支援ガイド.png',
    fileNumber: '603',
    sortOrder: 11,
    category: 'recruitment',
    categoryLabel: '創業・経営革新',
    title: '創業・経営支援ガイド',
    subtitle: 'ビジネスの立ち上げから事業拡大・承継まで、伴走型で全面バックアップ',
    targetAudience: ['新規創業者', 'スタートアップ', '第2創業・事業承継検討企業', '中小企業経営者'],
    summary: '高山市内で新たに事業を始める方や、新事業展開・事業承継を目指す経営者を対象に、創業支援等事業計画に基づく専門家相談、創業塾、補助金、低利融資を提供します。',
    keyPoints: [
      '特定創業支援等事業の受講による登録免許税半減・信用保証枠拡充等の優遇',
      '創業補助金による店舗改装費・初期設備費・広告宣伝費の補助',
      '商工会議所・金融機関・インキュベーション施設等によるワンストップ相談',
      '事業承継マッチングと後継者育成プログラムの提供'
    ],
    subsidyOrBenefit: '創業補助金（上限100万〜200万円等） / 特定創業支援の公的証明書',
    requirements: '高山市内で新規開業または新分野進出を行う個人・法人',
    contactDepartment: '高山市 雇用・産業振興課 / 高山商工会議所 / 飛騨高山しんきん',
    contactPhone: '0577-35-3144',
    tags: ['創業支援', 'スタートアップ', '特定創業支援', '事業承継', '経営改善'],
    themeColor: {
      primary: '#475B46', // Evergreen
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#475B46',
      badgeBg: '#E7ECE7'
    },
    visualBadges: ['創業補助金あり', '特定創業支援', '伴走サポート'],
    detailsList: [
      { label: '支援内容', value: 'ビジネスプラン策定、資金調達、販路開拓' },
      { label: '特定創業支援', value: '1ヶ月以上の継続指導で公的特例適用' },
      { label: '相談窓口', value: '無料個別相談随時受付' }
    ]
  },
  {
    id: 12,
    fileName: '701_若者地元就職支援.png',
    fileNumber: '701',
    sortOrder: 12,
    category: 'workplace',
    categoryLabel: '若者定着・就職',
    title: '若者地元就職支援',
    subtitle: '地元で学び、地元で働く。高校生・若者の地元就職を促進する総合施策',
    targetAudience: ['市内高校生・卒業生', '若手求職者', '保護者・教職員', '市内企業'],
    summary: '地域の高校生や若者が地元企業の魅力や働きがいを正しく理解し、高山市で就職・定着できるよう、企業紹介ブックの配布や学校訪問、保護者向けセミナー等を実施します。',
    keyPoints: [
      '市内高校生向け地元企業ガイドブックの作成・全生徒への配布',
      '高校と地元企業をつなぐ進路指導担当教員向け情報連絡会',
      '「地元で働く魅力」を伝える保護者向け就職ガイダンス',
      '就職後の早期離職を防ぐ若手フォローアップ相談体制'
    ],
    subsidyOrBenefit: '各種就職応援施策・就職祝い金や生活支援との連携',
    requirements: '市内就職を希望する若年者、および若手採用に意欲的な市内事業所',
    contactDepartment: '高山市 雇用・産業振興課 / 地域高校連携部会',
    contactPhone: '0577-35-3144',
    tags: ['若者就職', '高校生就活', '地元定着', '企業ガイド', '保護者向け'],
    themeColor: {
      primary: '#5A5A40', // Olive Moss
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#5A5A40',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['高校生必見', '地元就職', '安心サポート'],
    detailsList: [
      { label: '連携高校', value: '斐太高校、高山工業高校、飛騨高山高校ほか' },
      { label: '配布物', value: '高山市若者応援企業ガイドブック' },
      { label: '相談対応', value: 'ジョブカフェ・ハローワーク共同窓口' }
    ]
  },
  {
    id: 13,
    fileName: '702_高山市奨学金返済支援のご案内.png',
    fileNumber: '702',
    sortOrder: 13,
    category: 'workplace',
    categoryLabel: '定住促進・奨学金',
    title: '高山市奨学金返済支援のご案内',
    subtitle: '高山市に住んで働く若者を応援！奨学金の返済額を市と企業で手厚く補助',
    targetAudience: ['大学・短大・高専・専門学校を卒業し市内に定住就業する若者', '支援を行う市内企業'],
    summary: '高等教育機関で奨学金を利用した若者が、高山市内に居住し市内企業に就職した場合、年間最大数十万円（複数年間）の奨学金返済額を助成する制度です。',
    keyPoints: [
      '最大数百万円規模の返済支援（年額上限×支援期間）',
      '市単独支援型および企業負担と連携した代理返還支援制度',
      '対象奨学金：日本学生支援機構（JASSO）、高山市奨学金等',
      '若者の経済的負担を軽減し、地元での生活設計と定住を応援'
    ],
    subsidyOrBenefit: '年間最大上限額×最長5〜10年間の返済額助成（合計最大100万〜150万円超）',
    requirements: '高山市内に住民票を有し、市内の対象事業所に正規雇用として就業する一定年齢以下の若者',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['奨学金返済支援', '定住促進', 'JASSO', '若手応援', '経済的支援'],
    themeColor: {
      primary: '#3F5B46', // Deep Green Moss
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#3F5B46',
      badgeBg: '#E4EDE6'
    },
    visualBadges: ['最大数百万円', '若者必見', '代理返還対応'],
    detailsList: [
      { label: '助成金額', value: '年間返済額の全額または一部（上限設定あり）' },
      { label: '助成期間', value: '最長5年間（または完済まで）' },
      { label: '対象年齢', value: '申請時30歳〜35歳未満等' }
    ]
  },
  {
    id: 14,
    fileName: '703_高山市若手社員セミナー.png',
    fileNumber: '703',
    sortOrder: 14,
    category: 'workplace',
    categoryLabel: '人材育成・スキルアップ',
    title: '高山市若手社員セミナー',
    subtitle: '入社1〜3年目の基礎力強化と同期ネットワークづくりを支援する研修講座',
    targetAudience: ['市内企業の入社1〜3年目の若手社員', '新入社員', '人事・育成担当者'],
    summary: 'ビジネスマナー、コミュニケーション、論理的思考、タイムマネジメント等の基礎スキルを身につけ、他社の同世代社員との交流を通じてモチベーションと定着率を高めるセミナーです。',
    keyPoints: [
      '実践的なワークショップ形式で即座に現場で役立つスキルを習得',
      '他社の若手社員との意見交換・グループワークによる刺激と仲間づくり',
      'メンタルヘルスやストレスケア、セルフマネジメント講座の実施',
      '受講後には企業経営者・上司へのフィードバックレポートを提供'
    ],
    subsidyOrBenefit: '受講料無料または格安（高山市主催・共催）',
    requirements: '高山市内に事業所を有する企業に勤務する新入社員・若手社員',
    contactDepartment: '高山市 雇用・産業振興課 / 高山商工会議所',
    contactPhone: '0577-35-3144',
    tags: ['若手社員セミナー', '新入社員研修', 'スキルアップ', '定着率向上', '同期交流'],
    themeColor: {
      primary: '#605847', // Muted Hazel
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#605847',
      badgeBg: '#EEE8DC'
    },
    visualBadges: ['受講料無料', '他社同期交流', '即実践スキル'],
    detailsList: [
      { label: '開催回数', value: '年2〜3回（春期新入社員編・秋期フォロー編）' },
      { label: '講師陣', value: '実績豊富なプロビジネス講師' },
      { label: '定員', value: '各回30名程度（先着順）' }
    ]
  },
  {
    id: 15,
    fileName: '704_地域ラボ・高山の活動紹介.png',
    fileNumber: '704',
    sortOrder: 15,
    category: 'roadmap',
    categoryLabel: '産学官連携・共創拠点',
    title: '地域ラボ・高山の活動紹介',
    subtitle: '岐阜大学×高山市×地域企業が織りなす、知とイノベーションの共創プラットフォーム',
    targetAudience: ['新規事業を創出したい市内企業', '学生・研究者', '地域おこし・探究活動に関心のある市民'],
    summary: '岐阜大学と高山市が連携して設置した地域密着型オープンイノベーション拠点。大学の学術知見と地域課題を結合させ、新商品開発、DX、地域探究型学習などを強力に推進します。',
    keyPoints: [
      '大学教授・研究者による技術相談・共同研究・産学官プロジェクト支援',
      '地域課題解決型ワークショップ・ビジネスプランコンテストの開催',
      '学生の地域滞在型フィールドワークやインターンのコーディネート',
      'コワーキングスペースやセミナー室など交流機能の開放'
    ],
    subsidyOrBenefit: '相談無料・共同研究コーディネート支援',
    requirements: '地域課題の解決や新事業展開に関心のある企業・個人・学生',
    contactDepartment: '岐阜大学地域協学センター 地域ラボ・高山 / 高山市 企画課・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['地域ラボ', '岐阜大学', '産学官連携', 'オープンイノベーション', '共同研究'],
    themeColor: {
      primary: '#50635C', // Slate Moss
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#50635C',
      badgeBg: '#E9EFEF'
    },
    visualBadges: ['岐阜大学連携', '共創拠点', '技術相談無料'],
    detailsList: [
      { label: '所在地', value: '高山市内交流拠点' },
      { label: '主な設備', value: 'ミーティングスペース、Wi-Fi、研究ブース' },
      { label: '利用対象', value: '市内企業、学生、地域イノベーター' }
    ]
  },
  {
    id: 16,
    fileName: '705_企業DX支援.png',
    fileNumber: '705',
    sortOrder: 16,
    category: 'workplace',
    categoryLabel: 'DX推進・デジタル化',
    title: '企業DX支援',
    subtitle: '業務効率化から新規デジタルビジネス創出まで、専門家派遣とIT導入を伴走支援',
    targetAudience: ['デジタル化・DXを進めたい市内中小企業', 'IT導入に悩む経営者'],
    summary: 'ペーパーレス化やクラウド導入、バックオフィス業務の自動化から、生成AI活用やEC展開まで、専門のITコーディネーター派遣とツール導入補助で企業のDXを支援します。',
    keyPoints: [
      'DX専門家（ITコーディネーター等）の無料派遣・現状診断と導入計画策定',
      'クラウドツール（会計・労務・受発注・受託管理・AI）導入経費の補助',
      '従業員向けデジタルスキルアップ研修やハンズオンセミナーの開催',
      '国（IT導入補助金）や県施策とのスムーズな連携申請サポート'
    ],
    subsidyOrBenefit: '専門家派遣無料（回数制限あり） / DX推進補助金（補助率1/2〜等）',
    requirements: '市内に事業所を有し、DXによる生産性向上を目指す中小企業者',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課 / デジタル推進室',
    contactPhone: '0577-35-3144',
    tags: ['企業DX', 'IT導入', '専門家派遣', 'クラウド化', '生成AI活用'],
    themeColor: {
      primary: '#43423E', // Charcoal Earth
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#43423E',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['専門家無料派遣', '補助金連携', 'AI・クラウド'],
    detailsList: [
      { label: '支援メニュー', value: '①IT現状診断 ②専門家派遣 ③導入補助金' },
      { label: '派遣回数', value: '1社あたり最大3〜5回無料' },
      { label: '成果事例', value: '受注管理自動化で作業時間50%削減等' }
    ]
  },
  {
    id: 17,
    fileName: '706_副業・兼業.png',
    fileNumber: '706',
    sortOrder: 17,
    category: 'workplace',
    categoryLabel: '副業・プロ人材活用',
    title: '副業・兼業',
    subtitle: '都市部の優秀なプロフェッショナル人材を副業・兼業でピンポイント活用',
    targetAudience: ['新規事業・マーケティング・DX等に専門人材を求める市内企業', '柔軟な働き方を検討する企業'],
    summary: '都市圏で活躍する高度専門人材（マーケター・デザイナー・エンジニア・財務プロ等）を副業・兼業として活用するマッチング支援および社内規程整備を支援します。',
    keyPoints: [
      '正社員採用が難しい専門分野のスキルを短期間・低コストで獲得',
      '副業人材マッチングプラットフォームの利用料や委託費用の補助',
      '社内人材の副業解禁・兼業受け入れに関する労務規程整備の助言',
      'リモートワークと現地訪問を組み合わせたプロジェクト推進'
    ],
    subsidyOrBenefit: '副業・兼業人材マッチング経費補助（一部助成）',
    requirements: '副業・兼業プロ人材を活用して経営課題解決に取り組む市内中小企業',
    contactDepartment: '高山市 雇用・産業振興課 / 岐阜県プロフェッショナル人材戦略拠点',
    contactPhone: '0577-35-3144',
    tags: ['副業兼業', 'プロ人材', 'スキルシェア', '新規事業', 'リモートワーク'],
    themeColor: {
      primary: '#7A5C43', // Warm Walnut
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#7A5C43',
      badgeBg: '#EFE7E0'
    },
    visualBadges: ['専門人材獲得', '低コスト導入', '新規事業加速'],
    detailsList: [
      { label: '活用分野', value: 'Webマーケ、ブランディング、DX導入、海外展開' },
      { label: '契約形態', value: '業務委託（月数十時間〜）' },
      { label: '連携拠点', value: '岐阜県プロ人材拠点・民間マッチング会社' }
    ]
  },
  {
    id: 18,
    fileName: '707_外国人材受け入れヒントと補助金案内.png',
    fileNumber: '707',
    sortOrder: 18,
    category: 'workplace',
    categoryLabel: '外国人材・多文化共生',
    title: '外国人材受け入れヒントと補助金案内',
    subtitle: '安心・円滑な外国人材の雇用と定着を支える手続きガイド＆助成制度',
    targetAudience: ['外国人材の受入を検討・実施している市内事業者', '登録支援機関'],
    summary: '特定技能や外国人技能実習生、専門職外国人材の受入に必要な在留資格手続き、日本語教育、生活環境整備のノウハウ提供とともに、受入にかかる初期費用を助成します。',
    keyPoints: [
      '特定技能制度等の受入手続き・登録支援機関選定のポイント解説',
      '外国人材の日本語学習経費や資格取得支援に対する補助金',
      '住環境整備（家電・家具購入、賃貸契約補助）への支援',
      '地域住民との交流促進と多文化共生社会の実現に向けたサポート'
    ],
    subsidyOrBenefit: '外国人材受入初期経費補助・日本語研修支援助成金',
    requirements: '市内事業所で適正に外国人材を受け入れ雇用する事業主',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課',
    contactPhone: '0577-35-3144',
    tags: ['外国人材', '特定技能', '技能実習', '多文化共生', '日本語学習補助'],
    themeColor: {
      primary: '#566657', // Sage Stone
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#566657',
      badgeBg: '#E9EFE9'
    },
    visualBadges: ['受入助成金', '多文化共生', '特定技能支援'],
    detailsList: [
      { label: '対象在留資格', value: '特定技能1号・2号、技術・人文知識・国際業務等' },
      { label: '対象経費', value: '受入諸経費、日本語教育費、住居初期整備費' },
      { label: '相談窓口', value: '外国人雇用アドバイザーによる個別相談' }
    ]
  },
  {
    id: 19,
    fileName: '708_勤労者融資.png',
    fileNumber: '708',
    sortOrder: 19,
    category: 'workplace',
    categoryLabel: '勤労者福祉・金融支援',
    title: '勤労者融資',
    subtitle: '市内で働く勤労者の生活安定と福祉向上のための低利融資・利子補給制度',
    targetAudience: ['市内中小企業に勤務する勤労者', '市内在住の労働者'],
    summary: '高山市内に勤務または在住する勤労者が、生活必需資金、教育資金、住宅・リフォーム資金、冠婚葬祭資金などを必要とする際に、提携金融機関を通じて低利で利用できる融資制度です。',
    keyPoints: [
      '安心の公的低金利（市による利子補給等の優遇措置あり）',
      '生活資金、教育ローン、マイカー資金、住宅リフォーム等幅広い使途に対応',
      '担保・保証人不要プラン（信用保証協会・保証機関の活用）',
      '市内のろうきん（東海労働金庫）や提携金融機関窓口で手軽に相談可能'
    ],
    subsidyOrBenefit: '公的優遇低金利融資 / 利子補給金制度',
    requirements: '高山市内に1年以上居住または同一事業所に1年以上勤務し、一定の収入がある勤労者',
    contactDepartment: '高山市 雇用・産業振興課 / 東海労働金庫 高山支店',
    contactPhone: '0577-35-3144',
    tags: ['勤労者融資', '低利融資', '生活資金', '教育ローン', '福祉制度'],
    themeColor: {
      primary: '#5C5852', // Warm Slate Brown
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#5C5852',
      badgeBg: '#EEEBE6'
    },
    visualBadges: ['公的低金利', '生活・教育応援', 'ろうきん提携'],
    detailsList: [
      { label: '資金使途', value: '生活資金、教育資金、住宅リフォーム資金等' },
      { label: '融資限度額', value: '資金使途に応じて100万円〜数百万円' },
      { label: '取扱金融機関', value: '東海労働金庫（ろうきん）高山支店ほか' }
    ]
  },
  {
    id: 20,
    fileName: '709_働き方改革セミナー.png',
    fileNumber: '709',
    sortOrder: 20,
    category: 'workplace',
    categoryLabel: '働き方改革・労働環境',
    title: '働き方改革セミナー',
    subtitle: '従業員のエンゲージメント向上と生産性を両立する魅力的な職場づくり講座',
    targetAudience: ['市内企業の経営者・役員', '人事労務担当者', '管理職'],
    summary: '時間外労働の削減、有給休暇取得促進、テレワークや時差出勤の導入、ハラスメント防止など、選ばれる企業になるための労働環境改善と法改正対策を学ぶセミナーです。',
    keyPoints: [
      '社会保険労務士や働き方改革コンサルタントによる実践的な法解説と具体策',
      '市内企業の先進的な働き方改革・業務改善の成功事例紹介',
      '国の「働き方改革推進支援助成金」や各種助成金の申請ノウハウ伝授',
      '従業員のモチベーション向上と採用力強化に直結する職場環境デザイン'
    ],
    subsidyOrBenefit: 'セミナー受講料無料 / 個別労務相談・助成金申請サポート',
    requirements: '職場環境改善や生産性向上に関心のある市内事業所',
    contactDepartment: '高山市 商工観光部 雇用・産業振興課 / 岐阜労働局',
    contactPhone: '0577-35-3144',
    tags: ['働き方改革', '労務管理', '生産性向上', '助成金活用', 'ハラスメント対策'],
    themeColor: {
      primary: '#5A5A40', // Forest Olive
      light: '#FAF8F3',
      border: '#E5E2DA',
      text: '#5A5A40',
      badgeBg: '#E9E5DE'
    },
    visualBadges: ['受講料無料', '助成金ノウハウ', '労務環境改善'],
    detailsList: [
      { label: '開催時期', value: '定期開催（年数回）' },
      { label: '主なテーマ', value: '労働時間短縮、年休取得、育児介護両立、同一労働同一賃金' },
      { label: '共催・協力', value: '岐阜県働き方改革推進支援センター、ハローワーク高山' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'すべての制度 (20)' },
  { id: 'roadmap', label: '000番台: 人材育成ロードマップ (2)' },
  { id: 'internship', label: '400番台: 体験・インターン・都市圏交流 (4)' },
  { id: 'location', label: '500番台: 企業立地・オフィス誘致 (3)' },
  { id: 'recruitment', label: '600番台: 採用広報・合説・創業支援 (3)' },
  { id: 'workplace', label: '700番台: 定着・DX・働き方改革 (8)' }
];
