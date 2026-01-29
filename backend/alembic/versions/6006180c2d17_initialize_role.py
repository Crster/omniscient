"""initialize role

Revision ID: 6006180c2d17
Revises: 13b64f818516
Create Date: 2026-01-26 08:49:16.431936

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6006180c2d17"
down_revision: Union[str, Sequence[str], None] = "13b64f818516"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    meta = sa.MetaData()
    role_tbl = sa.Table("role", meta, autoload_with=op.get_bind())

    op.bulk_insert(
        role_tbl,
        [
            {"code": "admin", "name": "Administrator", "permissions": ["create-user"]},
            {
                "code": "validator",
                "name": "Validator",
                "permissions": ["validate-survey", "edit-survey"],
            },
            {"code": "surveyor", "name": "Surveyor", "permissions": ["take-survey"]},
        ],
    )
    pass


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DELETE FROM role WHERE code = 'admin'")
    op.execute("DELETE FROM role WHERE code = 'validator'")
    op.execute("DELETE FROM role WHERE code = 'surveyor'")
    pass
