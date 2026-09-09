import { Image } from "../../atoms/Image";
import { Text } from "../../atoms/Text";
import { AnchorLink } from "../../atoms/AnchorLink";
import Stack from "../../primitives/Stack/Stack";
import styles from "./Card.module.css";
import { Icon } from "../../atoms/Icon";

import type { ReactNode } from "react";

export type CardVariant = "default" | "quiz";

export interface CardProps {
  variant?: CardVariant;

  image?: string;
  title?: string;
  description?: ReactNode;

  // Dates
  startDate?: string | number | Date;
  endDate?: string | number | Date;
  lastDateToApply?: ReactNode;
  expiryDate?: ReactNode;

  // Location
  district?: ReactNode;
  state?: ReactNode;

  // Stats
  hours?: ReactNode;
  applicants?: ReactNode;
  Opportunities?: ReactNode;

  // Quiz
  totalAttempt?: ReactNode;
  totalScore?: ReactNode;
  passingScore?: ReactNode;
  questions?: ReactNode;

  // CTA
  href?: string;
  cta?: ReactNode;

  className?: string;
  organization?: ReactNode;
}

interface VariantConfigItem {
  showDateRange: boolean;
  showLocation: boolean;
  showHours: boolean;
  showApplicants: boolean;
  showOpportunities: boolean;
  showAssessment: boolean;
  showQuestionStats: boolean;
  showCTA: boolean;
}

const formatDate = (
  value?: string | number | Date
): string => {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return String(value);
};

const Card = ({
  variant = "default",

  image,
  title,
  description,

  // Dates
  startDate,
  endDate,
  lastDateToApply,
  expiryDate,

  // Location
  district,
  state,

  // Stats
  hours,
  applicants,
  Opportunities,

  // Quiz
  totalAttempt,
  totalScore,
  passingScore,
  questions,

  // CTA
  href,
  cta,

  className = "",
}: CardProps) => {
  const classes = [
    styles.card,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /*
   * Location
   */
  const formattedLocation = [
    district,
    state,
  ]
    .map((item) =>
      String(item || "").trim()
    )
    .filter(Boolean)
    .join(", ");

  /*
   * Dates
   */
  const formattedStartDate =
    formatDate(startDate);

  const formattedEndDate =
    formatDate(endDate);

  const hasDateRange =
    formattedStartDate ||
    formattedEndDate;

  const hasDateOverlay =
    Boolean(lastDateToApply) ||
    Boolean(expiryDate);

  /*
   * Variant configuration
   */
  const variantConfig: Record<
    CardVariant,
    VariantConfigItem
  > = {
    default: {
      showDateRange: true,
      showLocation: true,
      showHours: true,
      showApplicants: true,
      showOpportunities: true,
      showAssessment: true,
      showQuestionStats: false,
      showCTA: false,
    },

    quiz: {
      showDateRange: true,
      showLocation: false,

      /*
       * Important:
       * Quiz should NOT show the normal
       * Hours stat row.
       */
      showHours: false,

      showApplicants: false,
      showOpportunities: false,

      showAssessment: true,

      /*
       * Special Questions + Hours UI
       */
      showQuestionStats: true,

      /*
       * CTA only for Quiz
       */
      showCTA: true,
    },
  };

  const config =
    variantConfig[variant];

  return (
    <article className={classes}>
      {/* ================= HEADER ================= */}

      <div className={styles.cardHeader}>
        {image && (
          <Image
            src={image}
            alt={title}
            className={styles.image}
          />
        )}

        {/* Last Day To Apply */}
        {hasDateOverlay && (
          <div className={styles.date}>
            {lastDateToApply && (
              <Text
                variant="label1"
                className={styles.label}
              >
                Last day to apply:{" "}
                {lastDateToApply}
              </Text>
            )}

            {expiryDate && (
              <Text variant="label1">
                Expiry Date:{" "}
                {expiryDate}
              </Text>
            )}
          </div>
        )}
      </div>

      <Stack gap="xs">
        <div className={styles.cardContent}>
          {/* ================= TITLE ================= */}

          {title && (
            <Text
              variant="h5"
              title={title}
              as="div"
              className={styles.cardTitle}
            >
              {title}
            </Text>
          )}

          {/* ================= DESCRIPTION ================= */}

          {description && (
            <Text variant="base">
              {description}
            </Text>
          )}

          {/* ================= DATE RANGE ================= */}

          {config.showDateRange &&
            hasDateRange && (
              <div
                className={`${styles.cardDate} ${styles.dateRow}`}
              >
                <div className={styles.fromDate}>
                  <span
                    className={styles.dateIcon}
                  >
                    <Icon
                      name="calendar"
                      size="md"
                      color="primary"
                    />
                  </span>

                  <div>
                    <Text
                      variant="label1"
                      as="div"
                    >
                      From Date
                    </Text>

                    <Text
                      variant="h6"
                      as="div"
                      color="primary"
                    >
                      {formattedStartDate ||
                        "N/A"}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text
                    variant="label1"
                    as="div"
                  >
                    To Date
                  </Text>

                  <Text
                    variant="h6"
                    as="div"
                    color="primary"
                  >
                    {formattedEndDate ||
                      "N/A"}
                  </Text>
                </div>
              </div>
            )}

          {/* ================= LOCATION ================= */}

          {config.showLocation && (
            <Text
              variant="sm"
              as="div"
              className={styles.statRow}
            >
              <Icon
                name="location"
                size="md"
                color="primary"
              />

              <span
                className={styles.statContent}
              >
                {formattedLocation ||
                  "N/A"}
              </span>
            </Text>
          )}

          {/* ================= HOURS ================= */}

          {/*
           * Default cards:
           * ELP / VO / ME
           *
           * Existing Hours UI remains unchanged.
           *
           * Quiz:
           * This is intentionally hidden.
           */}
          {config.showHours &&
            hours && (
              <Text
                variant="sm"
                as="div"
                className={styles.statRow}
              >
                <Icon
                  name="hour"
                  size="md"
                  color="primary"
                />

                <span
                  className={
                    styles.statContent
                  }
                >
                  <Text
                    as="span"
                    className={
                      styles.statLabel
                    }
                  >
                    Hours
                  </Text>

                  {hours}
                </span>
              </Text>
            )}

          {/* ================= APPLICANTS ================= */}

          {config.showApplicants &&
            applicants && (
              <Text
                variant="sm"
                as="div"
                className={styles.statRow}
              >
                <Icon
                  name="applicants"
                  size="md"
                  color="primary"
                />

                <span
                  className={
                    styles.statContent
                  }
                >
                  <Text
                    as="span"
                    className={
                      styles.statLabel
                    }
                  >
                    Applicants
                  </Text>

                  {applicants}
                </span>
              </Text>
            )}

          {/* ================= OPPORTUNITIES ================= */}

          {config.showOpportunities &&
            Opportunities && (
              <Text
                variant="sm"
                as="div"
                className={styles.statRow}
              >
                <Icon
                  name="Opportunities"
                  size="md"
                  color="primary"
                />

                <span
                  className={
                    styles.statContent
                  }
                >
                  <Text
                    as="span"
                    className={
                      styles.statLabel
                    }
                  >
                    Opportunities
                  </Text>

                  {Opportunities}
                </span>
              </Text>
            )}

          {/* ================= QUIZ ASSESSMENT ================= */}

          {config.showAssessment &&
            totalAttempt && (
              <Text
                variant="sm"
                as="div"
                className={styles.statRow}
              >
                <Icon
                  name="attempt"
                  size="md"
                  color="primary"
                />

                <span
                  className={
                    styles.statContent
                  }
                >
                  <Text
                    as="span"
                    className={
                      styles.statLabel
                    }
                  >
                    Total Attempt
                  </Text>

                  {totalAttempt}
                </span>
              </Text>
            )}

          {config.showAssessment &&
            totalScore && (
              <Text
                variant="sm"
                as="div"
                className={styles.statRow}
              >
                <Icon
                  name="score"
                  size="md"
                  color="primary"
                />

                <span
                  className={
                    styles.statContent
                  }
                >
                  <Text
                    as="span"
                    className={
                      styles.statLabel
                    }
                  >
                    Total Score
                  </Text>

                  {totalScore}
                </span>
              </Text>
            )}

          {config.showAssessment &&
            passingScore && (
              <Text variant="sm">
                Passing Score:{" "}
                {passingScore}
              </Text>
            )}

          {/* ================= QUIZ QUESTIONS + HOURS ================= */}

          {/*
           * Hours are displayed ONLY here
           * for Quiz cards.
           *
           * Therefore there is no repetition
           * of the Hours field.
           */}
          
          {(config.showQuestionStats || config.showCTA) &&
            (questions || hours) && (
              <div
                className={
                  styles.questionWrapper
                }
              >
                {questions && (
                  <div
                    className={
                      styles.questions
                    }
                  >
                    <Text
                      variant="h5"
                      as="div"
                    >
                      {questions}
                    </Text>

                    <span>
                      Questions
                    </span>
                  </div>
                )}

                {hours && (
                  <div
                    className={
                      styles.questionhours
                    }
                  >
                    <Text
                      variant="h5"
                      as="div"
                    >
                      {hours}
                    </Text>

                    <span>
                      Hours
                    </span>
                  </div>
                )}

                { href &&
                  cta && (
                    <AnchorLink href={href} className={styles.quizButton}>
                      {cta}
                    </AnchorLink>
                  )
                }
              </div>
            )}
        </div>
      </Stack>
    </article>
  );
};

export default Card;