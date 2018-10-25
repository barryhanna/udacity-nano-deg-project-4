/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test that checks each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("has URL defined", function() {
                allFeeds.forEach(item => {
                    expect(item.url).toBeDefined();
                    expect(item.url).not.toBe("");
                });
         });


        /* This test that checks each feed in the allFeeds object 
         * and ensures it has a name defined
         * and that the name is not empty.
         */
         it("has a name defined", function() {
                allFeeds.forEach(item => {
                    expect(item.name).toBeDefined();
                    expect(item.name).not.toBe("");
                });
         });
    });


    /* Tests for the menu */ 
    describe("The menu", function() {
        
        /* This test that ensures the menu element is
         * hidden by default. This depends on the body element containing
         * a class of menu-hidden.
         */
        it("is hidden by default", function() {
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

         /* This test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again. This
          * is based upon the menu icon being clicked and the
          * body element having a class of menu-hidden or not.
          */
        it("is shown/hidden when menu icon is clicked.", function() {
            const menuIcon = document.querySelector(".menu-icon-link");
            menuIcon.click();
            let menuIsHidden = document.querySelector("body").classList.contains("menu-hidden");
            // the menu should not be hidden after the
            // menu icon has been clicked.
            expect(menuIsHidden).not.toBe(true);
            menuIcon.click();
            // now see if the menu has been hidden
            menuIsHidden = document.querySelector("body").classList.contains("menu-hidden");
            expect(menuIsHidden).toBe(true);
        });

    })

    /* Initial Entries tests */
    describe("Initial Entries", function() {

         beforeEach(function(done) {
           loadFeed(0,done);
         });

         // check that the feed has at least one 
         // item after it is initially loaded.
         it("has at least one entry", function() {
            const feedEntryNum = document.querySelectorAll(".feed .entry").length;
            expect(feedEntryNum).not.toBe(0);
         });
    });
    /* A new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        let feedOne;
        let feedTwo;

        // load two different feeds and store the title of the first
        // item of each.
        beforeEach(function(done) {
           loadFeed(0,function() {
                // load the title of the first feed's entry item
                // feedOne = document.querySelector(".entry").children[0].firstChild.textContent;
                feedOne = document.querySelector(".feed").innerHTML
                loadFeed(allFeeds.length-1,function() {
                    // load the title of the last feed's entry item
                    // feedTwo = document.querySelector(".entry").children[0].firstChild.textContent;
                    feedTwo = document.querySelector(".feed").innerHTML;
                    done(); 
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it("is updating correctly when changed.", function() {
            // check if there are two feeds to use.
            expect(allFeeds.length > 1).toBe(true);
            expect(feedOne).not.toEqual(feedTwo);
         });
     });
}());
