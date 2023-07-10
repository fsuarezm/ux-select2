import {Controller} from '@hotwired/stimulus';
import 'select2';
import 'select2/dist/js/i18n/es';
import 'select2/dist/js/i18n/ca';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    isSelect = () => this.element.nodeName === 'SELECT';

    isSelect2 = () => this.element.className.includes('select2');

    isLive = () => this.select2;

    isPreview = () =>
        document.documentElement.hasAttribute('data-turbolinks-preview');

    isBooting = () =>
        this.isSelect() && !this.isSelect2() && !this.isPreview() && !this.isLive();

    initialize() {
        if (!this.isBooting()) return false;

        const ajaxUrl = this.data.get('url');
        if (ajaxUrl) {
            this.config = {
                ajax: {
                    url: ajaxUrl,
                    method: 'POST',
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {'query': params.term, 'page': params.page};
                    },
                    // to indicate that infinite scrolling can be used
                    processResults: function (data) {
                        return {
                            results: data.results,
                            pagination: {
                                more: data.has_next_page
                            }
                        };
                    },
                    cache: true,
                }
            }
        }

        const pre_config = Object.assign({}, this.config);
        const config_s = this.data.get('config');
        const config = config_s ? JSON.parse(config_s) : {};
        this.config = Object.assign({}, pre_config, config);

        return this.config;
    }

    connect() {
        if (!this.isBooting()) return false;

        // Register the teardown listener and start up Select2.
        document.addEventListener('turbolinks:before-render', this._teardown);
        this.select2 = window
            .jQuery(this.element)
            .select2(Object.assign({}, this.config));

        return this.config;
    }

    _teardown = () => this.teardown();

    teardown(event) {
        if (!this.isLive()) return false;

        document.removeEventListener('turbolinks:before-render', this._teardown);
        this.select2.destroy();
        this.select2 = undefined;

        return this.config;
    }
}