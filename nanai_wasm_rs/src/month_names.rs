use std::collections::HashMap;
use std::sync::LazyLock;

use crate::types::Language;

/// 月名のデータを一箇所に集約
/// LazyLockを使用して初期化時のコストを削減
pub static MONTH_NAMES: LazyLock<HashMap<Language, [&'static str; 12]>> = LazyLock::new(|| {
    let mut map = HashMap::new();

    // 日本語（和名月）
    map.insert(
        Language::Japanese,
        [
            "睦月",
            "如月",
            "弥生",
            "卯月",
            "皐月",
            "水無月",
            "文月",
            "葉月",
            "長月",
            "神無月",
            "霜月",
            "師走",
        ],
    );

    // 英語
    map.insert(
        Language::English,
        [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    );

    // ウクライナ語（キリル文字）
    map.insert(
        Language::Ukrainian,
        [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
        ],
    );

    // ウクライナ語（ラテン文字転写）
    map.insert(
        Language::UkrainianAlphabet,
        [
            "si-chen",
            "lu-tyi",
            "be-re-zen",
            "kvi-ten",
            "tra-vehn",
            "cher-vehn",
            "ly-pehn",
            "ser-pehn",
            "ve-re-sehn",
            "zhov-tehn",
            "lys-to-pad",
            "hru-dehn",
        ],
    );

    // スウェーデン語
    map.insert(
        Language::Swedish,
        [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December",
        ],
    );

    // フィンランド語
    map.insert(
        Language::Finnish,
        [
            "Tammikuu",
            "Helmikuu",
            "Maaliskuu",
            "Huhtikuu",
            "Toukokuu",
            "Kesäkuu",
            "Heinäkuu",
            "Elokuu",
            "Syyskuu",
            "Lokakuu",
            "Marraskuu",
            "Joulukuu",
        ],
    );

    // ポーランド語
    map.insert(
        Language::Polish,
        [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień",
        ],
    );

    // チェコ語
    map.insert(
        Language::Czech,
        [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec",
        ],
    );

    // スロバキア語
    map.insert(
        Language::Slovak,
        [
            "Január",
            "Február",
            "Marec",
            "Apríl",
            "Máj",
            "Jún",
            "Júl",
            "August",
            "September",
            "Október",
            "November",
            "December",
        ],
    );

    // リトアニア語
    map.insert(
        Language::Lithuanian,
        [
            "Sausis",
            "Vasaris",
            "Kovas",
            "Balandis",
            "Gegužė",
            "Birželis",
            "Liepa",
            "Rugpjūtis",
            "Rugsėjis",
            "Spalis",
            "Lapkritis",
            "Gruodis",
        ],
    );

    // ラトビア語
    map.insert(
        Language::Latvian,
        [
            "Janvāris",
            "Februāris",
            "Marts",
            "Aprīlis",
            "Maijs",
            "Jūnijs",
            "Jūlijs",
            "Augusts",
            "Septembris",
            "Oktobris",
            "Novembris",
            "Decembris",
        ],
    );

    // エストニア語
    map.insert(
        Language::Estonian,
        [
            "Jaanuar",
            "Veebruar",
            "Märts",
            "Aprill",
            "Mai",
            "Juuni",
            "Juuli",
            "August",
            "September",
            "Oktoober",
            "November",
            "Detsember",
        ],
    );

    map
});
