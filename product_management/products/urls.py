from django.urls import path, include
from .views import ProductListCreate, ProductRetrieveUpdateDestroy, ProductViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    path("products/", ProductListCreate.as_view(), name="product-list-create"),
    path(
        "products/<int:pk>",
        ProductRetrieveUpdateDestroy.as_view(),
        name="product-detail",
    ),
]
