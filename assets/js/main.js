(function(){
  function isNew(iso){
    if(!iso) return false;
    var d = new Date(iso);
    if(isNaN(d)) return false;
    var diff = (Date.now() - d.getTime()) / (1000*60*60*24);
    return diff <= 7;
  }

  var list = document.getElementById('storyList');
  var loadMoreBtn = document.getElementById('loadMore');
  var searchInput = document.getElementById('searchInput');
  var genreFilter = document.getElementById('genreFilter');
  var tagFilter = document.getElementById('tagFilter');

  if(list){
    var cards = Array.from(list.querySelectorAll('.story-card'));

    // NEW badge on cards
    cards.forEach(function(card){
      var latest = card.getAttribute('data-latest');
      var badge = card.querySelector('.badge.new');
      if(badge){
        if(isNew(latest)) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
      }
      // default visibility
      card._visible = true;
    });

    var BATCH = 12, visibleCount = Math.min(BATCH, cards.length);

    function renderVisible(){
      // hide all non-matching
      cards.forEach(function(c){
        if(c._visible === false){
          c.style.display = 'none';
        }
      });

      // show only the first `visibleCount` matching
      var visibleCards = cards.filter(function(c){ return c._visible !== false; });
      visibleCards.forEach(function(c, i){
        c.style.display = (i < visibleCount) ? '' : 'none';
      });

      if(visibleCount >= visibleCards.length) loadMoreBtn && loadMoreBtn.classList.add('hidden');
      else loadMoreBtn && loadMoreBtn.classList.remove('hidden');
    }

    function applyFilters(){
      var q = (searchInput && searchInput.value || "").trim().toLowerCase();
      var g = (genreFilter && genreFilter.value || "").toLowerCase();
      var t = (tagFilter && tagFilter.value || "").toLowerCase();

      cards.forEach(function(card){
        var ok = true;
        var title = (card.dataset.title || "");
        var summary = (card.dataset.summary || "");
        var genre = (card.dataset.genre || "");
        var tagsStr = (card.dataset.tags || "");
        var tags = tagsStr.split(',').map(function(s){ return s.trim(); });

        if(q){
          ok = title.includes(q) || summary.includes(q) || genre.includes(q) || tagsStr.includes(q);
        }
        if(ok && g){
          ok = (genre === g);
        }
        if(ok && t){
          ok = tags.includes(t);
        }
        card._visible = ok;
      });

      // reset pagination for the new filtered set
      var totalVisible = cards.filter(function(c){ return c._visible !== false; }).length;
      visibleCount = Math.min(BATCH, totalVisible);

      renderVisible();
    }

    // initial render
    renderVisible();

    loadMoreBtn && loadMoreBtn.addEventListener('click', function(){
      var visibleCards = cards.filter(function(c){ return c._visible !== false; });
      visibleCount = Math.min(visibleCards.length, visibleCount + BATCH);
      renderVisible();
    });

    searchInput && searchInput.addEventListener('input', applyFilters);
    genreFilter && genreFilter.addEventListener('change', applyFilters);
    tagFilter && tagFilter.addEventListener('change', applyFilters);
  }

  // NEW badges on chapter list
  var chapterItems = Array.from(document.querySelectorAll('.chapter-item'));
  chapterItems.forEach(function(item){
    var iso = item.getAttribute('data-posted');
    var badge = item.querySelector('.badge.new');
    if(badge){
      if(isNew(iso)) badge.classList.remove('hidden');
      else badge.classList.add('hidden');
    }
  });
})();
