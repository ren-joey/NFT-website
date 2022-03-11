
import Loader from "src/lib/loaderPlugin/loader";
import about_b from 'src/assets/images/about_b.png';
import arrow_down from 'src/assets/images/arrow_down.png';
import b_alien_1 from 'src/assets/images/b_alien_1.png';
import b_alien_2 from 'src/assets/images/b_alien_2.png';
import b_alien_3 from 'src/assets/images/b_alien_3.png';
import b_alien_4 from 'src/assets/images/b_alien_4.png';
import b_alien_5 from 'src/assets/images/b_alien_5.png';
import b_alien_6 from 'src/assets/images/b_alien_6.png';
import b_alien_7 from 'src/assets/images/b_alien_7.png';
import b_alien_ground from 'src/assets/images/b_alien_ground.png';
import b_alien_pc from 'src/assets/images/b_alien_pc.png';
import b_alien_wave_gif from 'src/assets/images/b_alien_wave.gif';
import b_alien_wave_png from 'src/assets/images/b_alien_wave.png';
import b_alien from 'src/assets/images/b_alien.png';
import bg from 'src/assets/images/bg.jpg';
import black_hole from 'src/assets/images/black_hole.png';
import blue_arrow from 'src/assets/images/blue_arrow.png';
import center_dots from 'src/assets/images/center_dots.png';
import discord_icon from 'src/assets/images/discord_icon.svg';
import discord_icon_gradient from 'src/assets/images/discord_icon_gradient.png';
import earth from 'src/assets/images/earth.png';
import feature_icon_1 from 'src/assets/images/feature_icon_1.png';
import feature_icon_2 from 'src/assets/images/feature_icon_2.png';
import feature_icon_3 from 'src/assets/images/feature_icon_3.png';
import feature_icon_4 from 'src/assets/images/feature_icon_4.png';
import feature_icon_5 from 'src/assets/images/feature_icon_5.png';
import glowing_star from 'src/assets/images/glowing_star.png';
import green_ball_1 from 'src/assets/images/green_ball_1.png';
import green_ball_2 from 'src/assets/images/green_ball_2.png';
import icon_text_bubble from 'src/assets/images/icon_text_bubble.png';
import line_turning_around from 'src/assets/images/line_turning_around.png';
import line_turning_left from 'src/assets/images/line_turning_left.png';
import line_turning_skew from 'src/assets/images/line_turning_skew.png';
import opensea_icon from 'src/assets/images/opensea_icon.svg';
import orange_ball_1 from 'src/assets/images/orange_ball_1.png';
import orange_ball_2 from 'src/assets/images/orange_ball_2.png';
import perspective_lines from 'src/assets/images/perspective_lines.png';
import purple_ball_1 from 'src/assets/images/purple_ball_1.png';
import purple_ball_2 from 'src/assets/images/purple_ball_2.png';
import roadmap from 'src/assets/images/roadmap.png';
import rocket from 'src/assets/images/rocket.svg';
import skull_icon_outline from 'src/assets/images/skull_icon_outline.svg';
import skull_icon from 'src/assets/images/skull_icon.svg';
import speed_lines from 'src/assets/images/speed_lines.png';
import spotlight_left from 'src/assets/images/spotlight_left.png';
import star_icon from 'src/assets/images/star_icon.svg';
import stars from 'src/assets/images/stars.png';
import to_be_continue from 'src/assets/images/to_be_continue.png';
import twitter_icon_gradient from 'src/assets/images/twitter_icon_gradient.png';
import twitter_icon from 'src/assets/images/twitter_icon.svg';
import vbc_logo from 'src/assets/images/vbc_logo.svg';
import wave from 'src/assets/images/wave.gif';
import font_a4 from 'src/assets/fonts/A4SPEED-Bold-DAFONT TTF.ttf';
import font_coco from 'src/assets/fonts/Coco-Sharp-Heavy-trial.ttf';
import font_toppan from 'src/assets/fonts/ToppanBunkyuMidashiGothicStdN-ExtraBold.otf';

const loader = () => new Promise<void>((res) => {
    const ImageLoader = new Loader();
    const ImageArr = ImageLoader.generator([
        discord_icon_gradient,
        about_b,
        arrow_down,
        b_alien_1,
        b_alien_2,
        b_alien_3,
        b_alien_4,
        b_alien_5,
        b_alien_6,
        b_alien_7,
        b_alien_ground,
        b_alien_pc,
        b_alien_wave_gif,
        b_alien_wave_png,
        b_alien,
        bg,
        black_hole,
        blue_arrow,
        center_dots,
        discord_icon,
        earth,
        feature_icon_1,
        feature_icon_2,
        feature_icon_3,
        feature_icon_4,
        feature_icon_5,
        glowing_star,
        green_ball_1,
        green_ball_2,
        icon_text_bubble,
        line_turning_around,
        line_turning_left,
        line_turning_skew,
        opensea_icon,
        orange_ball_1,
        orange_ball_2,
        perspective_lines,
        purple_ball_1,
        purple_ball_2,
        roadmap,
        rocket,
        skull_icon_outline,
        skull_icon,
        speed_lines,
        spotlight_left,
        star_icon,
        stars,
        to_be_continue,
        twitter_icon_gradient,
        twitter_icon,
        vbc_logo,
        wave,
        font_a4,
        font_coco,
        font_toppan
    ]);
    ImageLoader.load(ImageArr).finally(() => {
        res();
    });
});

export default loader;