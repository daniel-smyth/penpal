-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "status" TEXT,
    "stripe_subscription_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextQuery" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT[],
    "article_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageQuery" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT[],
    "article_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_stripe_subscription_id_key" ON "Billing"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_stripe_customer_id_key" ON "Billing"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_user_id_key" ON "Billing"("user_id");

-- CreateIndex
CREATE INDEX "Billing_stripe_subscription_id_idx" ON "Billing"("stripe_subscription_id");

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextQuery" ADD CONSTRAINT "TextQuery_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageQuery" ADD CONSTRAINT "ImageQuery_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
