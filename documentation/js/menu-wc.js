'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-roles-and-permissions-using-casl documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ArticlesModule.html" data-type="entity-link" >ArticlesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' : 'data-bs-target="#xs-controllers-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' :
                                            'id="xs-controllers-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' }>
                                            <li class="link">
                                                <a href="controllers/ArticlesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' : 'data-bs-target="#xs-injectables-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' :
                                        'id="xs-injectables-links-module-ArticlesModule-c899bde8c8a91e1541eeb7f7f120656f6198e107c568396e1110362495956b2ea404836f2e96499ee0bd0f37e68294e7f63230e9931f4901afe4642141831d19"' }>
                                        <li class="link">
                                            <a href="injectables/ArticlesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' :
                                            'id="xs-controllers-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' :
                                        'id="xs-injectables-links-module-AuthModule-e6c08c23b089e6f22818c829a93f3ce011b3a34b219e00dbc5697a9cbefc964d9fa3f288938810aa1e0112ba85221049fb5fe75905a50f9482292d4ee30c3f70"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaslModule.html" data-type="entity-link" >CaslModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CaslModule-07c4fa8e55fedaff53dde10b8e744c81bb9073ca6998e2d0d31633bf54bdce7133c855322d020ff9a276ae16e0d45910f2af8a42ff9eb40b2348301a9ae1fe35"' : 'data-bs-target="#xs-injectables-links-module-CaslModule-07c4fa8e55fedaff53dde10b8e744c81bb9073ca6998e2d0d31633bf54bdce7133c855322d020ff9a276ae16e0d45910f2af8a42ff9eb40b2348301a9ae1fe35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-07c4fa8e55fedaff53dde10b8e744c81bb9073ca6998e2d0d31633bf54bdce7133c855322d020ff9a276ae16e0d45910f2af8a42ff9eb40b2348301a9ae1fe35"' :
                                        'id="xs-injectables-links-module-CaslModule-07c4fa8e55fedaff53dde10b8e744c81bb9073ca6998e2d0d31633bf54bdce7133c855322d020ff9a276ae16e0d45910f2af8a42ff9eb40b2348301a9ae1fe35"' }>
                                        <li class="link">
                                            <a href="injectables/CaslAbilityFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslAbilityFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' :
                                            'id="xs-controllers-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' :
                                        'id="xs-injectables-links-module-UsersModule-7c5bc3ab587b1ba9581c12b1e93db3a8539ba52c212d5b909fca411087e6752b134c560086b6b595199e4fcce020414d3db204a3bacd731ba72bf629c53128fe"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Article.html" data-type="entity-link" >Article</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponseDto.html" data-type="entity-link" >ApiResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArticleDto.html" data-type="entity-link" >CreateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginAuthDto.html" data-type="entity-link" >LoginAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterAuthDto.html" data-type="entity-link" >RegisterAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateArticleDto.html" data-type="entity-link" >UpdateArticleDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ResponseTransformInterceptor.html" data-type="entity-link" >ResponseTransformInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});