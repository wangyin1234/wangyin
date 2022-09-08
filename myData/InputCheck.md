# データチェック(正規表現参照)
<table><tbody>
<tr><th>日本語表現</th><th>CISルール定義</th><th>正規表現/説明</th></tr>
<tr><td>日付(yyyy-MM-dd)</td><td>DATE_FORMAT_YYYY-MM-DD</td><td>日付形式 YYYY-MM-DD</td></tr>
<tr><td>金融機関コード</td><td>BANKCODE</td><td>定数の銀行コード</td></tr>
<tr><td>アプリケーションID</td><td>APPID</td><td>定数のアプリケーションID</td></tr>
<tr><td>認証区分</td><td>AUTHTYPE</td><td>03固定</td></tr>
<tr><td>スコープ</td><td>SCOPE</td><td>定数のスコープ</td></tr>
<tr><td>科目コード</td><td>ACCOUNTTYPE</td><td>00固定</td></tr>
<tr><td>半角：英字 + 数字 + 記号</td><td>HALF_ALPHA_NUM_SYMBOL</td><td>^[\u0000-\u00FF]*$</td></tr>
<tr><td>メールアドレス</td><td>MAILADDRESS</td><td>^[A-Za-z0-9\!#\$%&'\*\+\-/=\?\^_`\{\|\}~\.]+@[A-Za-z0-9\!#\$%&'\*\+\-/=\?\^_`\{\|\}~]+(\.[A-Za-z0-9\!#\$%&'\*\+\-/=\?\^_`\{\|\}~]+)+$</td></tr>
<tr><td>半角：数字</td><td>HALF_NUM</td><td>^[0-9]*$</td></tr>
<tr><td>半角/全角：英字 + 数字 + カナ + ホスト許容記号(),\-./\\｢｣*&$@=%+;･ 　（），・ー－．／￥「」＊＆＄＠＝％＋；</td><td>FULL_HALF_HOST</td><td>^[0-9０-９a-zａ-ｚA-ZＡ-Ｚ(),\-./\\｢｣*&$@=%+;･ 　（），・ー－．／￥「」＊＆＄＠＝％＋；ｦ-ﾝﾞﾟガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>半角：英字 + 数字 + カナ + ホスト許容記号()-/*&$,.@=%+;</td><td>HALF_HOST</td><td>^[0-9a-zA-Z｡-ﾟ\\()-/*&$,.@=%+; ]*$</td></tr>
<tr><td>半角：英字 + 数字 + カナ + ホスト許容記号-()</td><td>HALF_HOST2</td><td>^[0-9a-zA-Z｡-ﾟ-() ]*$</td></tr>
<tr><td>半角：数字 + ハイフン</td><td>HALF_NUM_HYPHEN</td><td>^[0-9-]*$</td></tr>
<tr><td>半角：英字 + 数字</td><td>HALF_ALPHA_NUM</td><td>^[0-9a-zA-Z]*$</td></tr>
<tr><td>半角：カナ</td><td>HALF_KANA</td><td>^[｡-ﾟ]*$</td></tr>
<tr><td>全角：英字 + 数字 + カナ + ホスト許容記号（），・ー－．／￥「」＊＆＄＠＝％＋；</td><td>FULL_HOST</td><td>^[０-９ａ-ｚＡ-Ｚ 　（），・ー－．／￥「」＊＆＄＠＝％＋；ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>半角：文字列</td><td>HALF_CHAR</td><td>^[｡-ﾟ\u0000-\u00FF]*$</td></tr>
<tr><td>全角：カナ</td><td>FULL_KANA</td><td>^[ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッー]*$</td></tr>
<tr><td>全角：文字列</td><td>FULL_CHAR</td><td>^[０-９ａ-ｚＡ-Ｚ　＠゛ー－−　。「」、・［］．＜＞（）！＆￥＊；：／，’＃＄％＋＝？＠＾＿‘｛｜｝ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>タイムスタンプ(yyyyMMddHHmmss)</td><td>DATE_FORMAT_yyyyMMddHHmmss</td><td></td></tr>
<tr><td>URL</td><td>URL_FORMAT</td><td></td></tr>
<tr><td>日付(yyyyMMdd)</td><td>DATE_FORMAT_yyyyMMdd</td><td></td></tr>
<tr><td>JIS第一/第二水準(「EAA3：凜」「EAA4：熙」許容する)</td><td>FULL</td><td></td></tr>
<tr><td>補足住所(漢字)</td><td>ADDITIONALADDRESS</td><td></td></tr>
<tr><td>補足住所(カナ)</td><td>ADDITIONALADDRESSKN</td><td></td></tr>
<tr><td>郵便番号</td><td>ZIPCODE</td><td>^[0-9]{3}-[0-9]{4}$</td></tr>
<tr><td>JIS第一/第二水準(「EAA3：凜」「EAA4：熙」許容しない)</td><td>SJIS</td><td></td></tr>
<tr><td>全角：英字 + 数字 + スペース + カナ</td><td>FULL_ALPHA_NUM_KANA</td><td>^[０-９ａ-ｚＡ-Ｚ　ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>全角：英字 + スペース + カナ</td><td>FULL_ALPHA_SPACE_KANA</td><td>^[ａ-ｚＡ-Ｚ　ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>半角：英字 + スペース + カナ</td><td>HALF_ALPHA_SPACE_KANA</td><td>^[a-zA-Z ｡-ﾟ]*$</td></tr>
<tr><td>半角：スペース + カナ</td><td>HALF_SPACE_KANA</td><td>^[ ｡-ﾟ]*$</td></tr>
<tr><td>全角：スペース + カナ</td><td>FULL_SPACE_KANA</td><td>^[　ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>全角：英字 + カナ</td><td>FULL_ALPHA_KANA</td><td>^[ａ-ｚＡ-Ｚガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>半角：英字 + カナ</td><td>HALF_ALPHA_KANA</td><td>^[a-zA-Z｡-ﾟ]*$</td></tr>
<tr><td>全角：英字 + スペース + カナ + 許容記号．，ー－−</td><td>NAME_KANA</td><td>^[ａ-ｚＡ-Ｚ．，ー－−　ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ]*$</td></tr>
<tr><td>半角名前</td><td>HALF_NAME</td><td>^[\s(),-./0-9A-Z\\\｢\｣ｦ\-ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ]*$</td></tr>
<tbody><table>
