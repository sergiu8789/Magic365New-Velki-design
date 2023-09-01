import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../PrivacyPolicy/PrivacyPolicy.module.css";

export const ResponsibleGame = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div
        className={`${styles.infoPageheader} col-12 d-inline-flex position-relative justify-content-center align-items-center`}
      >
        <label className={`${styles.pageName} d-inline-flex`}>
          Responsible Gaming
        </label>
        <span
          className={`${styles.closePage} position-absolute end-0 d-inline-flex align-items-center justify-content-center icon-close`}
          onClick={() => navigate(-1)}
          role="button"
        ></span>
      </div>
      <div
        className={`${styles.infoPageContent} position-relative col-12 d-inline-flex flex-column overflow-y-auto`}
      >
        <p>
          Magic365 is committed to endorsing responsible wagering among its
          customers as well as promoting the awareness of problem gambling and
          improving prevention, intervention and treatment.{" "}
        </p>
        <br />
        <p>
          Magic365’s Responsible Gambling Policy sets out its commitment to
          minimizing the negative effects of problem gambling and to promoting
          responsible gambling practices.{" "}
        </p>
        <br />
        <p>
          Magic365 supports the generation of online gamblers offering them a
          wide range of games and entertainment. We also take responsibility for
          our product line-up.{" "}
        </p>
        <br />
        <p>
          {" "}
          The aim of Magic365 is to provide the world’s safest and most
          innovative gaming platform for adults. The offered clear and safe
          products allow each user to play within his financial means and to
          receive the highest quality service. Integrity, fairness and
          reliability are the guiding principles of Magic365’s work. It is
          therefore clear that Magic365 should do its best to avoid and reduce
          the problems, which can arise from participation in gambling,
          particularly in cases of immoderate playing. At the same time it is
          important to respect the rights of those who take part in games of
          chance to a reasonable extent as means of entertainment.{" "}
        </p>
        <br />
        <p>
          {" "}
          Responsible Gaming at Magic365 is based on three fundamental
          principles: Security of the player, Security of the game and
          Protection against gaming addiction. Together with research
          institutes, associations and therapy institutions, we work on creation
          of a responsible, secure and reliable framework for online gaming.{" "}
        </p>
        <br />
        <h2>Player security</h2>
        <p>
          {" "}
          We take responsibility for the security of our players. Protection of
          the players is based on forbidding the attendance of the minors from
          participation in games and the protection of privacy, which involves
          responsible processing of personal data and payments. Fairness and the
          random nature of the products offered are monitored closely by
          independent organizations. Marketing communication is also geared
          towards player protection: we promise only what players can receive in
          our transparent line.{" "}
        </p>
        <br />
        <h2>
          Protection against gaming addiction: research – prevention –
          intervention
        </h2>
        <p>
          {" "}
          The majority of users who make sports bets, casino bets and other
          gaming offers play in moderation for entertainment. Certain habits and
          behavior patterns (such as shopping, playing sports, eating or
          consumption of alcohol) which are considered to be normal and not
          causing any concern can develop into addiction for some people and
          cause problems. In the same way, bets on sports and gambling can lead
          to problems for a small group of customers. Clients with gaming
          addiction are prohibited from further participation in the gaming
          line-up. Subsequently the customers are provided with contacts of
          organizations where they can receive professional advice and support.{" "}
        </p>
        <br />
        <h2>Self-responsibility is the most sustainable form of prevention</h2>
        <p>
          {" "}
          The basic principle promoted by Magic365 is that the final decision
          and responsibility on whether to play or not, and how much money can
          be spent on the game should be assumed by the customer himself.
          Self-responsibility of the customer is therefore the most effective
          form of protection from addiction. Magic365 sees its responsibility in
          assisting the customers by providing transparent products, full
          information and keeping a clear line of conduct.{" "}
        </p>
        <br />
        <h2>Protection of minors</h2>
        <p>
          Magic365 does not allow minors (persons under the age of 18) to
          participate in games and make bets. That’s why the confirmation of
          having reached the age of majority and the confirmation of date of
          birth are mandatory requirements during registration. Magic365
          considers the issue of minors taking part in games and betting very
          seriously. In order to offer the best possible protection of minors,
          we also rely on the support of parents and caregivers. Please keep
          your data for account access in a safe place (user ID and password).
          Furthermore, we would recommend that you install filter software. This
          software will allow you to restrict the access to Internet resources
          inappropriate for children and teenagers.{" "}
        </p>
        <br />
        <h2>Responsibility towards problems</h2>
        <p>
          Magic365 offers a variety of games and bets, which are forms of
          entertainment for the majority of customers. At the same time the
          company takes responsibility for its customers by providing support
          and tools for maintenance of a secure and entertaining environment
          taking into account the associated risks. The clients who have
          difficulty in assessing risks, recognizing their own limits or those
          who suffer from gambling addiction are not able to enjoy our product
          line-up responsibly and perceive it as a form of entertainment.
          Magic365 takes responsibility for such users by blocking their access
          to its products for their own protection.{" "}
        </p>
        <br />
        <h2>Get informed with the main issues!</h2>
        <p>
          {" "}
          Most people play for pleasure. Moderate participation in games within
          their financial capacity is fully acceptable. However, for a small
          percentage of people gambling is not a form of entertainment, it is a
          challenge that must be considered seriously.{" "}
        </p>
        <br />
        <h2>What is the probl@tic game behavior?</h2>
        <p>
          {" "}
          A problematic game behavior is considered to be such behavior, which
          interferes mode of life, work, financial position or health of a
          person or his family. Long participation in games is counter
          indicative to such person as it can lead to negative consequences. In
          1980 the pathological game dependence has been officially recognized
          and enlisted in the list of psychological diseases of international
          classification system DSM-IV and ICD-10. It is defined as long,
          repeating and frequently amplifying inclination for game, despite of
          existing negative personal and social circumstances, such as a debt,
          rupture of family relations and delay of professional growth.{" "}
        </p>
        <br />
        <h2>
          In what cases behavior of a person should be considered as dependence?
        </h2>
        <p></p>
        <p>
          {" "}
          It is necessary to underline that the diagnoses of game dependence can
          be qualified only by experts. The material presented on this web-page
          will help you to estimate and define your own game behaviour. The
          special hazard of addictions that are not associated with any
          substance is that it is very difficult to define the line between
          pleasure and addiction. Nevertheless, there are some diagnostic
          signals that may point out the existing problems. In the presence of
          at least five of the following symptoms, the likelihood of the severe
          dependence is high:{" "}
        </p>
        <ol>
          <li>
            The player is deeply involved in gambling, all his thoughts are only
            about the game.
          </li>
          <li>Bet sum increases in course of time.</li>
          <li>
            Attempts to quit or control his participation in the games appear to
            be unsuccessful.
          </li>
          <li>
            When limiting his participation in gambling, a person experiences
            irritation and disappointment.
          </li>
          <li>The game is a way to escape from problems or discomfort.</li>
          <li>The player tries to win back the lost amount,</li>
          <li>Lies about his playing behavior,</li>
          <li>Commits illegal acts,</li>
          <li>Spoils or breaks the relationship with family and colleagues,</li>
          <li>Borrows to participate in the games.</li>
        </ol>
        <br />
        <h2>Rules for responsible games</h2>
        <p></p>
        <p>
          Following the rules placed below, you can enjoy the game without
          anxiety:
        </p>
        <ol>
          <li>Start playing only when you are calm and concentrated.</li>
          <li>Take regular breaks.</li>
          <li>
            Define for yourself beforehand the monthly amount you can spend on
            the game.
          </li>
          <li>Once setting a maximum limit, do not further increase it.</li>
          <li>
            Before you start playing, define the maximum amount of winning,
            after reaching of which you should stop playing.
          </li>
          <li>Define the amount you can afford to lose beforehand.</li>
          <li>Do not start playing under alcohol or drug influence.</li>
          <li>Do not start playing in a depressed state.</li>
        </ol>
        <br />
      </div>
    </React.Fragment>
  );
};
