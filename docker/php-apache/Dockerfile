FROM php:7.4-apache

RUN pecl install timecop-beta
RUN apt-get update
RUN apt-get install -y vim

COPY ./php.ini /usr/local/etc/php/
#COPY ./apache2.conf /usr/local/etc/php/

RUN apt-get update \
    && apt-get -y install vim wget mariadb-client \
    && docker-php-ext-install pdo_mysql mysqli mbstring zip
RUN apt-get update && apt-get install -y \
        vim
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        gcc \
        make \
        curl \
        gnupg \
        libfreetype6-dev \
        ssmtp \
        && docker-php-ext-install mcrypt zip \
        && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
        && docker-php-ext-install -j$(nproc) gd exif
# composer のインストール
COPY --from=composer:1.10 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1

RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data

RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod include
RUN ln -s /etc/apache2/mods-available/vhost_alias.load /etc/apache2/mods-enabled
#RUN echo ServerName $HOSTNAME > /etc/apache2/conf-available/fqdn.conf && a2enconf fqdn

COPY ./000-default.conf /usr/local/apache2/conf
#RUN a2dissite 000-default

EXPOSE 80

