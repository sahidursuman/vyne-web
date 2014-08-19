class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name
      t.string :alpha_2
      t.string :alpha_3

      t.timestamps
    end
  end

  # Ref:
  # http://stefangabos.ro/other-projects/list-of-world-countries-with-national-flags/#download
  #
  def self.up
    execute "
      INSERT INTO `countries` (`name`, `alpha_2`, `alpha_3`) VALUES
      ('Afghanistan', 'af', 'afg'),
      ('Aland Islands', 'ax', 'ala'),
      ('Albania', 'al', 'alb'),
      ('Algeria', 'dz', 'dza'),
      ('American Samoa', 'as', 'asm'),
      ('Andorra', 'ad', 'and'),
      ('Angola', 'ao', 'ago'),
      ('Anguilla', 'ai', 'aia'),
      ('Antarctica', 'aq', ''),
      ('Antigua and Barbuda', 'ag', 'atg'),
      ('Argentina', 'ar', 'arg'),
      ('Armenia', 'am', 'arm'),
      ('Aruba', 'aw', 'abw'),
      ('Australia', 'au', 'aus'),
      ('Austria', 'at', 'aut'),
      ('Azerbaijan', 'az', 'aze'),
      ('Bahamas', 'bs', 'bhs'),
      ('Bahrain', 'bh', 'bhr'),
      ('Bangladesh', 'bd', 'bgd'),
      ('Barbados', 'bb', 'brb'),
      ('Belarus', 'by', 'blr'),
      ('Belgium', 'be', 'bel'),
      ('Belize', 'bz', 'blz'),
      ('Benin', 'bj', 'ben'),
      ('Bermuda', 'bm', 'bmu'),
      ('Bhutan', 'bt', 'btn'),
      ('Bolivia, Plurinational State of', 'bo', 'bol'),
      ('Bonaire, Sint Eustatius and Saba', 'bq', 'bes'),
      ('Bosnia and Herzegovina', 'ba', 'bih'),
      ('Botswana', 'bw', 'bwa'),
      ('Bouvet Island', 'bv', ''),
      ('Brazil', 'br', 'bra'),
      ('British Indian Ocean Territory', 'io', ''),
      ('Brunei Darussalam', 'bn', 'brn'),
      ('Bulgaria', 'bg', 'bgr'),
      ('Burkina Faso', 'bf', 'bfa'),
      ('Burundi', 'bi', 'bdi'),
      ('Cambodia', 'kh', 'khm'),
      ('Cameroon', 'cm', 'cmr'),
      ('Canada', 'ca', 'can'),
      ('Cape Verde', 'cv', 'cpv'),
      ('Cayman Islands', 'ky', 'cym'),
      ('Central African Republic', 'cf', 'caf'),
      ('Chad', 'td', 'tcd'),
      ('Chile', 'cl', 'chl'),
      ('China', 'cn', 'chn'),
      ('Christmas Island', 'cx', ''),
      ('Cocos (Keeling) Islands', 'cc', ''),
      ('Colombia', 'co', 'col'),
      ('Comoros', 'km', 'com'),
      ('Congo', 'cg', 'cog'),
      ('Congo, The Democratic Republic of the', 'cd', 'cod'),
      ('Cook Islands', 'ck', 'cok'),
      ('Costa Rica', 'cr', 'cri'),
      ('Cote d\'Ivoire', 'ci', 'civ'),
      ('Croatia', 'hr', 'hrv'),
      ('Cuba', 'cu', 'cub'),
      ('Curacao', 'cw', 'cuw'),
      ('Cyprus', 'cy', 'cyp'),
      ('Czech Republic', 'cz', 'cze'),
      ('Denmark', 'dk', 'dnk'),
      ('Djibouti', 'dj', 'dji'),
      ('Dominica', 'dm', 'dma'),
      ('Dominican Republic', 'do', 'dom'),
      ('Ecuador', 'ec', 'ecu'),
      ('Egypt', 'eg', 'egy'),
      ('El Salvador', 'sv', 'slv'),
      ('Equatorial Guinea', 'gq', 'gnq'),
      ('Eritrea', 'er', 'eri'),
      ('Estonia', 'ee', 'est'),
      ('Ethiopia', 'et', 'eth'),
      ('Falkland Islands (Malvinas)', 'fk', 'flk'),
      ('Faroe Islands', 'fo', 'fro'),
      ('Fiji', 'fj', 'fji'),
      ('Finland', 'fi', 'fin'),
      ('France', 'fr', 'fra'),
      ('French Guiana', 'gf', 'guf'),
      ('French Polynesia', 'pf', 'pyf'),
      ('French Southern Territories', 'tf', ''),
      ('Gabon', 'ga', 'gab'),
      ('Gambia', 'gm', 'gmb'),
      ('Georgia', 'ge', 'geo'),
      ('Germany', 'de', 'deu'),
      ('Ghana', 'gh', 'gha'),
      ('Gibraltar', 'gi', 'gib'),
      ('Greece', 'gr', 'grc'),
      ('Greenland', 'gl', 'grl'),
      ('Grenada', 'gd', 'grd'),
      ('Guadeloupe', 'gp', 'glp'),
      ('Guam', 'gu', 'gum'),
      ('Guatemala', 'gt', 'gtm'),
      ('Guernsey', 'gg', 'ggy'),
      ('Guinea', 'gn', 'gin'),
      ('Guinea-Bissau', 'gw', 'gnb'),
      ('Guyana', 'gy', 'guy'),
      ('Haiti', 'ht', 'hti'),
      ('Heard Island and McDonald Islands', 'hm', ''),
      ('Holy See (Vatican City State)', 'va', 'vat'),
      ('Honduras', 'hn', 'hnd'),
      ('Hong Kong', 'hk', 'hkg'),
      ('Hungary', 'hu', 'hun'),
      ('Iceland', 'is', 'isl'),
      ('India', 'in', 'ind'),
      ('Indonesia', 'id', 'idn'),
      ('Iran, Islamic Republic of', 'ir', 'irn'),
      ('Iraq', 'iq', 'irq'),
      ('Ireland', 'ie', 'irl'),
      ('Isle of Man', 'im', 'imn'),
      ('Israel', 'il', 'isr'),
      ('Italy', 'it', 'ita'),
      ('Jamaica', 'jm', 'jam'),
      ('Japan', 'jp', 'jpn'),
      ('Jersey', 'je', 'jey'),
      ('Jordan', 'jo', 'jor'),
      ('Kazakhstan', 'kz', 'kaz'),
      ('Kenya', 'ke', 'ken'),
      ('Kiribati', 'ki', 'kir'),
      ('Korea, Democratic People\'s Republic of', 'kp', 'prk'),
      ('Korea, Republic of', 'kr', 'kor'),
      ('Kuwait', 'kw', 'kwt'),
      ('Kyrgyzstan', 'kg', 'kgz'),
      ('Lao People\'s Democratic Republic', 'la', 'lao'),
      ('Latvia', 'lv', 'lva'),
      ('Lebanon', 'lb', 'lbn'),
      ('Lesotho', 'ls', 'lso'),
      ('Liberia', 'lr', 'lbr'),
      ('Libyan Arab Jamahiriya', 'ly', 'lby'),
      ('Liechtenstein', 'li', 'lie'),
      ('Lithuania', 'lt', 'ltu'),
      ('Luxembourg', 'lu', 'lux'),
      ('Macao', 'mo', 'mac'),
      ('Macedonia, The former Yugoslav Republic of', 'mk', 'mkd'),
      ('Madagascar', 'mg', 'mdg'),
      ('Malawi', 'mw', 'mwi'),
      ('Malaysia', 'my', 'mys'),
      ('Maldives', 'mv', 'mdv'),
      ('Mali', 'ml', 'mli'),
      ('Malta', 'mt', 'mlt'),
      ('Marshall Islands', 'mh', 'mhl'),
      ('Martinique', 'mq', 'mtq'),
      ('Mauritania', 'mr', 'mrt'),
      ('Mauritius', 'mu', 'mus'),
      ('Mayotte', 'yt', 'myt'),
      ('Mexico', 'mx', 'mex'),
      ('Micronesia, Federated States of', 'fm', 'fsm'),
      ('Moldova, Republic of', 'md', 'mda'),
      ('Monaco', 'mc', 'mco'),
      ('Mongolia', 'mn', 'mng'),
      ('Montenegro', 'me', 'mne'),
      ('Montserrat', 'ms', 'msr'),
      ('Morocco', 'ma', 'mar'),
      ('Mozambique', 'mz', 'moz'),
      ('Myanmar', 'mm', 'mmr'),
      ('Namibia', 'na', 'nam'),
      ('Nauru', 'nr', 'nru'),
      ('Nepal', 'np', 'npl'),
      ('Netherlands', 'nl', 'nld'),
      ('New Caledonia', 'nc', 'ncl'),
      ('New Zealand', 'nz', 'nzl'),
      ('Nicaragua', 'ni', 'nic'),
      ('Niger', 'ne', 'ner'),
      ('Nigeria', 'ng', 'nga'),
      ('Niue', 'nu', 'niu'),
      ('Norfolk Island', 'nf', 'nfk'),
      ('Northern Mariana Islands', 'mp', 'mnp'),
      ('Norway', 'no', 'nor'),
      ('Oman', 'om', 'omn'),
      ('Pakistan', 'pk', 'pak'),
      ('Palau', 'pw', 'plw'),
      ('Palestinian Territory, Occupied', 'ps', 'pse'),
      ('Panama', 'pa', 'pan'),
      ('Papua New Guinea', 'pg', 'png'),
      ('Paraguay', 'py', 'pry'),
      ('Peru', 'pe', 'per'),
      ('Philippines', 'ph', 'phl'),
      ('Pitcairn', 'pn', 'pcn'),
      ('Poland', 'pl', 'pol'),
      ('Portugal', 'pt', 'prt'),
      ('Puerto Rico', 'pr', 'pri'),
      ('Qatar', 'qa', 'qat'),
      ('Reunion', 're', 'reu'),
      ('Romania', 'ro', 'rou'),
      ('Russian Federation', 'ru', 'rus'),
      ('Rwanda', 'rw', 'rwa'),
      ('Saint Barthelemy', 'bl', 'blm'),
      ('Saint Helena, Ascension and Tristan Da Cunha', 'sh', 'shn'),
      ('Saint Kitts and Nevis', 'kn', 'kna'),
      ('Saint Lucia', 'lc', 'lca'),
      ('Saint Martin (French Part)', 'mf', 'maf'),
      ('Saint Pierre and Miquelon', 'pm', 'spm'),
      ('Saint Vincent and The Grenadines', 'vc', 'vct'),
      ('Samoa', 'ws', 'wsm'),
      ('San Marino', 'sm', 'smr'),
      ('Sao Tome and Principe', 'st', 'stp'),
      ('Saudi Arabia', 'sa', 'sau'),
      ('Senegal', 'sn', 'sen'),
      ('Serbia', 'rs', 'srb'),
      ('Seychelles', 'sc', 'syc'),
      ('Sierra Leone', 'sl', 'sle'),
      ('Singapore', 'sg', 'sgp'),
      ('Sint Maarten (Dutch Part)', 'sx', 'sxm'),
      ('Slovakia', 'sk', 'svk'),
      ('Slovenia', 'si', 'svn'),
      ('Solomon Islands', 'sb', 'slb'),
      ('Somalia', 'so', 'som'),
      ('South Africa', 'za', 'zaf'),
      ('South Georgia and The South Sandwich Islands', 'gs', ''),
      ('South Sudan', 'ss', 'ssd'),
      ('Spain', 'es', 'esp'),
      ('Sri Lanka', 'lk', 'lka'),
      ('Sudan', 'sd', 'sdn'),
      ('Suriname', 'sr', 'sur'),
      ('Svalbard and Jan Mayen', 'sj', 'sjm'),
      ('Swaziland', 'sz', 'swz'),
      ('Sweden', 'se', 'swe'),
      ('Switzerland', 'ch', 'che'),
      ('Syrian Arab Republic', 'sy', 'syr'),
      ('Taiwan, Province of China', 'tw', ''),
      ('Tajikistan', 'tj', 'tjk'),
      ('Tanzania, United Republic of', 'tz', 'tza'),
      ('Thailand', 'th', 'tha'),
      ('Timor-Leste', 'tl', 'tls'),
      ('Togo', 'tg', 'tgo'),
      ('Tokelau', 'tk', 'tkl'),
      ('Tonga', 'to', 'ton'),
      ('Trinidad and Tobago', 'tt', 'tto'),
      ('Tunisia', 'tn', 'tun'),
      ('Turkey', 'tr', 'tur'),
      ('Turkmenistan', 'tm', 'tkm'),
      ('Turks and Caicos Islands', 'tc', 'tca'),
      ('Tuvalu', 'tv', 'tuv'),
      ('Uganda', 'ug', 'uga'),
      ('Ukraine', 'ua', 'ukr'),
      ('United Arab Emirates', 'ae', 'are'),
      ('United Kingdom', 'gb', 'gbr'),
      ('United States', 'us', 'usa'),
      ('United States Minor Outlying Islands', 'um', ''),
      ('Uruguay', 'uy', 'ury'),
      ('Uzbekistan', 'uz', 'uzb'),
      ('Vanuatu', 'vu', 'vut'),
      ('Venezuela, Bolivarian Republic of', 've', 'ven'),
      ('Viet Nam', 'vn', 'vnm'),
      ('Virgin Islands, British', 'vg', 'vgb'),
      ('Virgin Islands, U.S.', 'vi', 'vir'),
      ('Wallis and Futuna', 'wf', 'wlf'),
      ('Western Sahara', 'eh', 'esh'),
      ('Yemen', 'ye', 'yem'),
      ('Zambia', 'zm', 'zmb'),
      ('Zimbabwe', 'zw', 'zwe')"
  end

  def self.down
    Countries.delete_all
  end

end
